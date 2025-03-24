'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale/ru';
import * as Encryption from '@/lib/encryption';

type LogEntry = {
  id: string;
  userId: string;
  dateTime: string;
  attentionFocus: string;
  thoughts: string;
  bodySensations: string;
  actions: string;
  howToAct: string;
  encryptedData: string;
  iv: string;
  createdAt: string;
};

export default function LogbookPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    attentionFocus: '',
    thoughts: '',
    bodySensations: '',
    actions: '',
    howToAct: ''
  });
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [encryptedUserKey, setEncryptedUserKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({
    attentionFocus: false,
    thoughts: false,
    bodySensations: false,
    actions: false,
    howToAct: false
  });
  const [selectedAttentionFocus, setSelectedAttentionFocus] = useState('');
  const [customAttentionFocus, setCustomAttentionFocus] = useState('');
  const [selectedActions, setSelectedActions] = useState('');
  const [customActions, setCustomActions] = useState('');
  const [selectedHowToAct, setSelectedHowToAct] = useState('');
  const [customHowToAct, setCustomHowToAct] = useState('');
  const [selectedThoughts, setSelectedThoughts] = useState<string[]>([]);
  const [customThoughts, setCustomThoughts] = useState('');
  const [bodySensationIntensity, setBodySensationIntensity] = useState(0);
  const [customBodySensations, setCustomBodySensations] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Function to decrypt the user's master key
  const decryptUserKey = useCallback(async (encryptedKey: string): Promise<CryptoKey | null> => {
    if (!session?.user?.id) return null;
    
    try {
      // Use the user's ID as the token to decrypt the key
      // In a real implementation, you would use a more secure mechanism
      const decryptedKeyBase64 = await Encryption.decryptMasterKey(encryptedKey, session.user.id);
      return await Encryption.importKeyFromBase64(decryptedKeyBase64);
    } catch (error) {
      console.error('Error decrypting user key:', error);
      return null;
    }
  }, [session]);
  
  // Function to decrypt logbook entries
  const decryptEntries = useCallback(async (entries: LogEntry[], key: CryptoKey): Promise<LogEntry[]> => {
    if (!key) return entries;
    
    const decryptedEntries = await Promise.all(
      entries.map(async (entry) => {
        // Skip entries that don't have encrypted data (legacy entries)
        if (!entry.encryptedData || entry.encryptedData === 'placeholder') {
          return entry;
        }
        
        try {
          // Decrypt the entry data
          const decryptedData = await Encryption.decryptData(entry.encryptedData, entry.iv, key);
          
          // Merge the decrypted data with the entry
          return {
            ...entry,
            attentionFocus: decryptedData.attentionFocus || entry.attentionFocus,
            thoughts: decryptedData.thoughts || entry.thoughts,
            bodySensations: decryptedData.bodySensations || entry.bodySensations,
            actions: decryptedData.actions || entry.actions,
            howToAct: decryptedData.howToAct || entry.howToAct
          };
        } catch (error) {
          console.error('Error decrypting entry:', error);
          return entry;
        }
      })
    );
    
    return decryptedEntries;
  }, []);

  // Fetch logbook entries
  useEffect(() => {
    if (session) {
      const fetchEntries = async () => {
        try {
          const response = await fetch('/api/logbook');
          if (!response.ok) {
            throw new Error('Failed to fetch logbook entries');
          }
          
          const data = await response.json();
          const { entries, encryptedKey } = data;
          
          setEncryptedUserKey(encryptedKey);
          
          // Try to decrypt the user's key
          if (encryptedKey) {
            const key = await decryptUserKey(encryptedKey);
            if (key) {
              setEncryptionKey(key);
              
              // Decrypt the entries
              const decryptedEntries = await decryptEntries(entries, key);
              setEntries(decryptedEntries);
            } else {
              setEntries(entries);
            }
          } else {
            setEntries(entries);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching logbook entries:', error);
          setIsLoading(false);
        }
      };

      fetchEntries();
    }
  }, [session, decryptUserKey, decryptEntries]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for the field being changed
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };
  
  // Handle attention focus selection
  const handleAttentionFocusSelect = (value: string) => {
    setSelectedAttentionFocus(value);
    
    // If there's custom text, combine selected value with custom text
    const newValue = customAttentionFocus 
      ? `${value}. ${customAttentionFocus}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      attentionFocus: newValue
    }));
    
    // Clear error
    setFormErrors(prev => ({
      ...prev,
      attentionFocus: false
    }));
  };
  
  // Handle custom attention focus text
  const handleCustomAttentionFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCustomAttentionFocus(value);
    
    // Combine selected value with custom text
    const newValue = selectedAttentionFocus 
      ? `${selectedAttentionFocus}. ${value}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      attentionFocus: newValue
    }));
  };
  
  // Handle actions selection
  const handleActionsSelect = (value: string) => {
    setSelectedActions(value);
    
    // If there's custom text, combine selected value with custom text
    const newValue = customActions 
      ? `${value}. ${customActions}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      actions: newValue
    }));
    
    // Clear error
    setFormErrors(prev => ({
      ...prev,
      actions: false
    }));
  };
  
  // Handle custom actions text
  const handleCustomActionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCustomActions(value);
    
    // Combine selected value with custom text
    const newValue = selectedActions 
      ? `${selectedActions}. ${value}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      actions: newValue
    }));
  };
  
  // Handle how to act selection
  const handleHowToActSelect = (value: string) => {
    setSelectedHowToAct(value);
    
    // If there's custom text, combine selected value with custom text
    const newValue = customHowToAct 
      ? `${value}. ${customHowToAct}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      howToAct: newValue
    }));
    
    // Clear error
    setFormErrors(prev => ({
      ...prev,
      howToAct: false
    }));
  };
  
  // Handle custom how to act text
  const handleCustomHowToActChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCustomHowToAct(value);
    
    // Combine selected value with custom text
    const newValue = selectedHowToAct 
      ? `${selectedHowToAct}. ${value}`
      : value;
      
    setNewEntry(prev => ({
      ...prev,
      howToAct: newValue
    }));
  };
  
  // Handle thoughts checkbox selection
  const handleThoughtCheckboxChange = (thought: string, checked: boolean) => {
    let newSelectedThoughts = [...selectedThoughts];
    
    if (checked) {
      // Add the thought if it's not already in the array
      if (!newSelectedThoughts.includes(thought)) {
        newSelectedThoughts.push(thought);
      }
    } else {
      // Remove the thought
      newSelectedThoughts = newSelectedThoughts.filter(t => t !== thought);
    }
    
    setSelectedThoughts(newSelectedThoughts);
    
    // Update thoughts in newEntry with combined selected thoughts and custom thoughts
    const thoughtsPrefix = newSelectedThoughts.length > 0 
      ? newSelectedThoughts.join('; ') 
      : '';
      
    const newValue = thoughtsPrefix && customThoughts 
      ? `${thoughtsPrefix}. ${customThoughts}`
      : thoughtsPrefix || customThoughts;
      
    setNewEntry(prev => ({
      ...prev,
      thoughts: newValue
    }));
    
    // Clear error
    if (newValue) {
      setFormErrors(prev => ({
        ...prev,
        thoughts: false
      }));
    }
  };
  
  // Handle custom thoughts text
  const handleCustomThoughtsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCustomThoughts(value);
    
    // Combine selected thoughts with custom text
    const thoughtsPrefix = selectedThoughts.length > 0 
      ? selectedThoughts.join('; ') 
      : '';
      
    const newValue = thoughtsPrefix && value 
      ? `${thoughtsPrefix}. ${value}`
      : thoughtsPrefix || value;
      
    setNewEntry(prev => ({
      ...prev,
      thoughts: newValue
    }));
    
    // Clear error if there's some value
    if (newValue) {
      setFormErrors(prev => ({
        ...prev,
        thoughts: false
      }));
    }
  };
  
  // Handle body sensation intensity slider
  const handleBodySensationIntensityChange = (value: number[]) => {
    const intensity = value[0];
    setBodySensationIntensity(intensity);
    
    // Combine intensity with custom text
    const newValue = customBodySensations
      ? `Интенсивность: ${intensity}. ${customBodySensations}`
      : `Интенсивность: ${intensity}`;
      
    setNewEntry(prev => ({
      ...prev,
      bodySensations: newValue
    }));
    
    // Clear error
    setFormErrors(prev => ({
      ...prev,
      bodySensations: false
    }));
  };
  
  // Handle custom body sensations text
  const handleCustomBodySensationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCustomBodySensations(value);
    
    // Combine intensity with custom text
    const newValue = value
      ? `Интенсивность: ${bodySensationIntensity}. ${value}`
      : `Интенсивность: ${bodySensationIntensity}`;
      
    setNewEntry(prev => ({
      ...prev,
      bodySensations: newValue
    }));
    
    // Clear error
    if (newValue) {
      setFormErrors(prev => ({
        ...prev,
        bodySensations: false
      }));
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    setSelectedEntries([]);
  };
  
  // Handle entry selection
  const toggleEntrySelection = (entryId: string) => {
    setSelectedEntries(prev => {
      if (prev.includes(entryId)) {
        return prev.filter(id => id !== entryId);
      } else {
        return [...prev, entryId];
      }
    });
  };
  
  // Handle delete entries
  const handleDeleteEntries = async () => {
    if (selectedEntries.length === 0) return;
    
    setIsDeleting(true);
    
    try {
      const response = await fetch('/api/logbook', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entryIds: selectedEntries }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete entries');
      }
      
      // Remove deleted entries from the state
      setEntries(prev => prev.filter(entry => !selectedEntries.includes(entry.id)));
      setSelectedEntries([]);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error deleting entries:', error);
      alert('Ошибка при удалении записей. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsDeleting(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    const { attentionFocus, thoughts, bodySensations, actions, howToAct } = newEntry;
    
    // Reset error states
    const newErrors = {
      attentionFocus: false,
      thoughts: false,
      bodySensations: false,
      actions: false,
      howToAct: false
    };
    
    // Check each field and set error state if empty
    let hasErrors = false;
    
    if (!attentionFocus) {
      newErrors.attentionFocus = true;
      hasErrors = true;
    }
    
    if (!thoughts) {
      newErrors.thoughts = true;
      hasErrors = true;
    }
    
    if (!bodySensations) {
      newErrors.bodySensations = true;
      hasErrors = true;
    }
    
    if (!actions) {
      newErrors.actions = true;
      hasErrors = true;
    }
    
    if (!howToAct) {
      newErrors.howToAct = true;
      hasErrors = true;
    }
    
    // Update error states
    setFormErrors(newErrors);
    
    // If any field is empty, don't submit the form
    if (hasErrors) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the data to be encrypted
      const dataToEncrypt = { ...newEntry };
      
      // Encrypt the data if we have an encryption key
      let encryptedData = '';
      let iv = '';
      
      if (encryptionKey) {
        try {
          // Encrypt the data
          const encrypted = await Encryption.encryptData(dataToEncrypt, encryptionKey);
          encryptedData = encrypted.encryptedData;
          iv = encrypted.iv;
        } catch (error) {
          console.error('Error encrypting entry:', error);
          // Continue with unencrypted data as fallback
        }
      }
      
      // Prepare the payload
      const payload = {
        ...newEntry,
        encryptedData,
        iv
      };
      
      const response = await fetch('/api/logbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save entry');
      }
      
      const savedEntry = await response.json();
      
      // Add the new entry to the entries list
      setEntries(prev => [savedEntry, ...prev]);
      
      // Reset the form and close the dialog
      setNewEntry({
        attentionFocus: '',
        thoughts: '',
        bodySensations: '',
        actions: '',
        howToAct: ''
      });
      setSelectedAttentionFocus('');
      setCustomAttentionFocus('');
      setSelectedActions('');
      setCustomActions('');
      setSelectedHowToAct('');
      setCustomHowToAct('');
      setSelectedThoughts([]);
      setCustomThoughts('');
      setBodySensationIntensity(0);
      setCustomBodySensations('');
      setFormErrors({
        attentionFocus: false,
        thoughts: false,
        bodySensations: false,
        actions: false,
        howToAct: false
      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving entry:', error);
      alert('Ошибка при сохранении записи. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy, HH:mm', { locale: ru });
  };
  
  // Export logbook entries to CSV
  const handleExportToCSV = () => {
    // CSV header row
    const csvHeader = [
      'Дата и время', 
      'Фокус внимания', 
      'Мысли', 
      'Телесные ощущения', 
      'Действия', 
      'Как действовать'
    ].join(',');
    
    // Format entries as CSV rows
    const csvRows = entries.map(entry => {
      // Format date for CSV
      const date = new Date(entry.dateTime);
      const formattedDate = format(date, 'dd.MM.yyyy HH:mm');
      
      // Escape and quote cell values to handle commas and quotes in the text
      const escapeCsvValue = (value: string) => {
        // Replace double quotes with two double quotes and wrap in quotes
        return `"${value.replace(/"/g, '""')}"`;
      };
      
      // Get values from the current entry (they're already decrypted in the state)
      return [
        escapeCsvValue(formattedDate),
        escapeCsvValue(entry.attentionFocus),
        escapeCsvValue(entry.thoughts),
        escapeCsvValue(entry.bodySensations),
        escapeCsvValue(entry.actions),
        escapeCsvValue(entry.howToAct)
      ].join(',');
    });
    
    // Combine header and rows
    const csvContent = [csvHeader, ...csvRows].join('\n');
    
    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element to trigger the download
    const link = document.createElement('a');
    
    // Set the filename with current date
    const today = format(new Date(), 'yyyy-MM-dd');
    link.download = `logbook-${today}.csv`;
    
    // Set the URL
    link.href = url;
    
    // Append the link to the document
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p>Загрузка...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Дневник наблюдений</h1>
            
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button
                    onClick={toggleEditMode}
                    variant="outline"
                    className="rounded-full"
                  >
                    Отмена
                  </Button>
                  
                  {selectedEntries.length > 0 && (
                    <Button
                      onClick={handleDeleteEntries}
                      variant="destructive"
                      className="rounded-full"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Удаление...' : `Удалить (${selectedEntries.length})`}
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    onClick={toggleEditMode}
                    variant="outline"
                    className="rounded-full"
                  >
                    Редактировать
                  </Button>
                  
                  {entries.length > 0 && (
                    <Button
                      onClick={handleExportToCSV}
                      variant="outline"
                      className="rounded-full"
                    >
                      Экспорт
                    </Button>
                  )}
                  
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 text-white rounded-full hover:bg-green-700">
                        Новая запись
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Добавить новую запись</DialogTitle>
                      </DialogHeader>
                      
                      <form onSubmit={handleSubmit} className="space-y-4 mt-4 pb-4">
                  <div className="space-y-2">
                    <label htmlFor="attentionFocus" className="font-medium">Фокус внимания</label>
                    <div className={`p-4 border rounded-md space-y-2 ${formErrors.attentionFocus ? "border-red-500" : "border-input"}`}>
                      <Select onValueChange={handleAttentionFocusSelect} value={selectedAttentionFocus}>
                        <SelectTrigger 
                          id="attentionFocus"
                        >
                          <SelectValue placeholder="На чем фокусируется внимание?" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="На визуальных образах">На визуальных образах</SelectItem>
                          <SelectItem value="На звуках">На звуках</SelectItem>
                          <SelectItem value="На смысле слов собеседника">На смысле слов собеседника</SelectItem>
                          <SelectItem value="На своих телесных ощущениях">На своих телесных ощущениях</SelectItem>
                          <SelectItem value="На собственных мыслях">На собственных мыслях</SelectItem>
                          <SelectItem value="Внимание перескакивает">Внимание перескакивает</SelectItem>
                          <SelectItem value="Внимание рассеяно">Внимание рассеяно</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id="customAttentionFocus"
                        name="customAttentionFocus"
                        value={customAttentionFocus}
                        onChange={handleCustomAttentionFocusChange}
                        placeholder="Дополнительные заметки о фокусе внимания..."
                        className="mt-2 placeholder:text-gray-400 text-black"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="thoughts" className="font-medium">Мысли</label>
                    <div className={`p-4 border rounded-md space-y-2 ${formErrors.thoughts ? "border-red-500" : "border-input"}`}>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-1" 
                            checked={selectedThoughts.includes("Установки - кому-то что-то должен")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("Установки - кому-то что-то должен", checked === true)}
                          />
                          <label htmlFor="thoughts-option-1" className="text-sm">Установки - кому-то что-то должен</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-2" 
                            checked={selectedThoughts.includes("О прошлом - ах если бы!")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("О прошлом - ах если бы!", checked === true)}
                          />
                          <label htmlFor="thoughts-option-2" className="text-sm">О прошлом - ах если бы!</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-3" 
                            checked={selectedThoughts.includes("О прошлом - негативные воспоминания")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("О прошлом - негативные воспоминания", checked === true)}
                          />
                          <label htmlFor="thoughts-option-3" className="text-sm">О прошлом - негативные воспоминания</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-4" 
                            checked={selectedThoughts.includes("О будущем - а вдруг!")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("О будущем - а вдруг!", checked === true)}
                          />
                          <label htmlFor="thoughts-option-4" className="text-sm">О будущем - а вдруг!</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-5" 
                            checked={selectedThoughts.includes("О будущем - множество вариантов")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("О будущем - множество вариантов", checked === true)}
                          />
                          <label htmlFor="thoughts-option-5" className="text-sm">О будущем - множество вариантов</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thoughts-option-6" 
                            checked={selectedThoughts.includes("Я-концепции - что про меня подумают")} 
                            onCheckedChange={(checked) => handleThoughtCheckboxChange("Я-концепции - что про меня подумают", checked === true)}
                          />
                          <label htmlFor="thoughts-option-6" className="text-sm">Я-концепции - что про меня подумают</label>
                        </div>
                      </div>
                      <Textarea
                        id="thoughts"
                        name="customThoughts"
                        value={customThoughts}
                        onChange={handleCustomThoughtsChange}
                        placeholder="Дополнительные мысли..."
                        rows={2}
                        className="placeholder:text-gray-400 text-black"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bodySensations" className="font-medium">Телесные ощущения</label>
                    <div className={`p-4 border rounded-md space-y-4 ${formErrors.bodySensations ? "border-red-500" : "border-input"}`}>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Интенсивность ощущений: {bodySensationIntensity}</label>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">0</span>
                          <div className="relative flex-1 h-6 flex items-center">
                            <div className="absolute w-full h-0.5 bg-gray-300 rounded"></div>
                            <Slider
                              value={[bodySensationIntensity]}
                              min={0}
                              max={10}
                              step={1}
                              onValueChange={handleBodySensationIntensityChange}
                              className="flex-1"
                            />
                          </div>
                          <span className="text-sm text-gray-500">10</span>
                        </div>
                      </div>
                      <Textarea
                        id="bodySensations"
                        name="customBodySensations"
                        value={customBodySensations}
                        onChange={handleCustomBodySensationsChange}
                        placeholder="Опишите ваши телесные ощущения..."
                        rows={3}
                        className="placeholder:text-gray-400 text-black"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="actions" className="font-medium">Действия</label>
                    <div className={`p-4 border rounded-md space-y-2 ${formErrors.actions ? "border-red-500" : "border-input"}`}>
                      <Select onValueChange={handleActionsSelect} value={selectedActions}>
                        <SelectTrigger id="actions-select">
                          <SelectValue placeholder="Эффективность действий" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Привели к желаемому результату">Привели к желаемому результату</SelectItem>
                          <SelectItem value="Не привели к желаемому результату">Не привели к желаемому результату</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        id="actions"
                        name="customActions"
                        value={customActions}
                        onChange={handleCustomActionsChange}
                        placeholder="Опишите подробнее ваши действия..."
                        className="mt-2 placeholder:text-gray-400 text-black"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="howToAct" className="font-medium">Как действовать</label>
                    <div className={`p-4 border rounded-md space-y-2 ${formErrors.howToAct ? "border-red-500" : "border-input"}`}>
                      <Select onValueChange={handleHowToActSelect} value={selectedHowToAct}>
                        <SelectTrigger id="howToAct-select">
                          <SelectValue placeholder="Как бы вы хотели действовать в будущем?" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Действия были оптимальными">Действия были оптимальными</SelectItem>
                          <SelectItem value="Знаю как лучше действовать">Знаю как лучше действовать</SelectItem>
                          <SelectItem value="Не знаю как действовать">Не знаю как действовать</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        id="howToAct"
                        name="customHowToAct"
                        value={customHowToAct}
                        onChange={handleCustomHowToActChange}
                        placeholder="Опишите подробнее..."
                        className="mt-2 placeholder:text-gray-400 text-black"
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="w-full rounded-full sm:w-auto"
                    >
                      Отмена
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="bg-green-600 text-white rounded-full hover:bg-green-700 sm:ml-auto"
                    >
                      {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                      </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
          
          {entries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-gray-500">У вас пока нет записей в дневнике наблюдений.</p>
              <p className="text-gray-500 mt-2">Нажмите &quot;Новая запись&quot;, чтобы создать первую запись.</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden hidden md:block">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-36 whitespace-nowrap">Дата и время</TableHead>
                        <TableHead className="whitespace-nowrap">Фокус внимания</TableHead>
                        <TableHead className="whitespace-nowrap">Мысли</TableHead>
                        <TableHead className="whitespace-nowrap">Телесные ощущения</TableHead>
                        <TableHead className="whitespace-nowrap">Действия</TableHead>
                        <TableHead className="whitespace-nowrap">Как действовать</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entries.map((entry) => (
                        <TableRow 
                          key={entry.id} 
                          className={`group ${isEditMode ? 'cursor-pointer hover:bg-gray-50' : ''} ${selectedEntries.includes(entry.id) ? 'bg-blue-50' : ''}`}
                          onClick={() => isEditMode && toggleEntrySelection(entry.id)}
                        >
                          <TableCell className="font-medium whitespace-nowrap">{formatDate(entry.dateTime)}</TableCell>
                          <TableCell className="max-w-[150px] truncate group-hover:whitespace-normal group-hover:overflow-visible">{entry.attentionFocus}</TableCell>
                          <TableCell className="max-w-[150px] truncate group-hover:whitespace-normal group-hover:overflow-visible">{entry.thoughts}</TableCell>
                          <TableCell className="max-w-[150px] truncate group-hover:whitespace-normal group-hover:overflow-visible">{entry.bodySensations}</TableCell>
                          <TableCell className="max-w-[150px] truncate group-hover:whitespace-normal group-hover:overflow-visible">{entry.actions}</TableCell>
                          <TableCell className="max-w-[150px] truncate group-hover:whitespace-normal group-hover:overflow-visible">{entry.howToAct}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              {/* Mobile Card View */}
              <div className="space-y-4 md:hidden">
                {entries.map((entry) => (
                  <div 
                    key={entry.id} 
                    className={`bg-white rounded-xl shadow-sm p-4 ${isEditMode ? 'cursor-pointer' : ''} ${selectedEntries.includes(entry.id) ? 'border-2 border-blue-400' : ''}`}
                    onClick={() => isEditMode && toggleEntrySelection(entry.id)}
                  >
                    <div className="font-medium text-green-600 mb-3">{formatDate(entry.dateTime)}</div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Фокус внимания</div>
                        <div className="mt-1">{entry.attentionFocus}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Мысли</div>
                        <div className="mt-1">{entry.thoughts}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Телесные ощущения</div>
                        <div className="mt-1">{entry.bodySensations}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Действия</div>
                        <div className="mt-1">{entry.actions}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-gray-500">Как действовать</div>
                        <div className="mt-1">{entry.howToAct}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}