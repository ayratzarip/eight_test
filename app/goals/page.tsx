'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Plus, Grip, Check, X } from 'lucide-react';
import * as Encryption from '@/lib/encryption';
import {
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Goal = {
  id: string;
  userId: string;
  text: string;
  isCompleted: boolean;
  order: number;
  encryptedData: string;
  iv: string;
  createdAt: string;
  updatedAt: string;
};

// Сортируемый элемент цели
function SortableGoalItem({ 
  goal, 
  isEditMode, 
  editingGoalId, 
  index,
  onToggleComplete, 
  onStartEdit, 
  onSaveEdit, 
  onCancelEdit, 
  onDelete, 
  editedGoalText, 
  setEditedGoalText 
}: { 
  goal: Goal;
  isEditMode: boolean;
  editingGoalId: string | null;
  index: number;
  onToggleComplete: (id: string) => void;
  onStartEdit: (goal: Goal) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onDelete: (id: string) => void;
  editedGoalText: string;
  setEditedGoalText: (text: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: goal.id, disabled: !isEditMode || !!editingGoalId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: index === 0 && !goal.isCompleted ? "1.25rem" : "1rem",
    fontSize: index === 0 && !goal.isCompleted ? "1.125rem" : "1rem",
    zIndex: isDragging ? 100 : 1
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all ${
        goal.isCompleted ? "opacity-70" : "opacity-100"
      } ${isEditMode ? "hover:shadow-md hover:border-blue-200 hover:border" : ""} 
        ${index === 0 && !goal.isCompleted ? "border-l-4 border-green-500" : ""}
        ${isDragging ? "shadow-lg border-2 border-blue-300 bg-blue-50" : ""}`}
    >
      <div className="flex items-center gap-3">
        {isEditMode && (
          <div 
            {...attributes} 
            {...listeners}
            className={`cursor-grab flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors ${isDragging ? "bg-blue-100" : ""}`}
            title="Перетащите, чтобы изменить порядок"
          >
            <Grip className={`h-5 w-5 ${isDragging ? "text-blue-600" : "text-gray-400"}`} />
          </div>
        )}
        
        <div className="flex-shrink-0">
          <Checkbox 
            id={`goal-${goal.id}`}
            checked={goal.isCompleted}
            onCheckedChange={() => onToggleComplete(goal.id)}
            disabled={isEditMode || editingGoalId === goal.id}
            className={goal.isCompleted ? "text-gray-400" : ""}
          />
        </div>
        
        <div className="flex-grow">
          {editingGoalId === goal.id ? (
            <div className="flex items-center gap-2">
              <Input
                value={editedGoalText}
                onChange={(e) => setEditedGoalText(e.target.value)}
                className="flex-grow"
                autoFocus
              />
              <Button 
                onClick={() => onSaveEdit(goal.id)}
                size="sm"
                className="p-1 h-8 w-8"
                disabled={!editedGoalText.trim()}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button 
                onClick={onCancelEdit}
                variant="outline"
                size="sm"
                className="p-1 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label 
              htmlFor={`goal-${goal.id}`}
              className={`cursor-pointer ${goal.isCompleted ? "line-through text-gray-400" : ""}`}
            >
              {goal.text}
            </label>
          )}
        </div>
        
        {isEditMode && editingGoalId !== goal.id && (
          <div className="flex gap-2">
            <Button
              onClick={() => onStartEdit(goal)}
              size="sm"
              variant="outline"
              className="p-1 h-8 w-8"
            >
              <Edit className="h-4 w-4 text-gray-500" />
            </Button>
            <Button
              onClick={() => onDelete(goal.id)}
              size="sm"
              variant="destructive"
              className="p-1 h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function GoalsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoalText, setNewGoalText] = useState('');
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);
  const [encryptedUserKey, setEncryptedUserKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editedGoalText, setEditedGoalText] = useState('');

  // Сенсоры для drag-n-drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8 // Должен потянуть на 8 пикселей, чтобы началось перетаскивание
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

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
      const decryptedKeyBase64 = await Encryption.decryptMasterKey(encryptedKey, session.user.id);
      return await Encryption.importKeyFromBase64(decryptedKeyBase64);
    } catch (error) {
      console.error('Error decrypting user key:', error);
      return null;
    }
  }, [session]);
  
  // Function to decrypt goals
  const decryptGoals = useCallback(async (goals: Goal[], key: CryptoKey): Promise<Goal[]> => {
    if (!key) return goals;
    
    const decryptedGoals = await Promise.all(
      goals.map(async (goal) => {
        // Skip goals that don't have encrypted data
        if (!goal.encryptedData || goal.encryptedData === '') {
          return goal;
        }
        
        try {
          // Decrypt the goal data
          const decryptedData = await Encryption.decryptData(goal.encryptedData, goal.iv, key);
          
          // Merge the decrypted data with the goal
          return {
            ...goal,
            text: decryptedData.text || goal.text,
            isCompleted: decryptedData.isCompleted !== undefined ? decryptedData.isCompleted : goal.isCompleted
          };
        } catch (error) {
          console.error('Error decrypting goal:', error);
          return goal;
        }
      })
    );
    
    return decryptedGoals;
  }, []);

  // Fetch goals
  useEffect(() => {
    if (session) {
      const fetchGoals = async () => {
        try {
          const response = await fetch('/api/goals');
          if (!response.ok) {
            throw new Error('Failed to fetch goals');
          }
          
          const data = await response.json();
          const { goals, encryptedKey } = data;
          
          setEncryptedUserKey(encryptedKey);
          
          // Try to decrypt the user's key
          if (encryptedKey) {
            const key = await decryptUserKey(encryptedKey);
            if (key) {
              setEncryptionKey(key);
              
              // Decrypt the goals
              const decryptedGoals = await decryptGoals(goals, key);
              setGoals(decryptedGoals);
            } else {
              setGoals(goals);
            }
          } else {
            setGoals(goals);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching goals:', error);
          setIsLoading(false);
        }
      };

      fetchGoals();
    }
  }, [session, decryptUserKey, decryptGoals]);

  // Add a new goal
  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newGoalText.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create the data to be encrypted
      const dataToEncrypt = { 
        text: newGoalText,
        isCompleted: false 
      };
      
      // Encrypt the data
      if (!encryptionKey) {
        throw new Error('Encryption key is not available');
      }
      
      const encrypted = await Encryption.encryptData(dataToEncrypt, encryptionKey);
      
      // Prepare the payload with only encrypted data
      const payload = {
        encryptedData: encrypted.encryptedData,
        iv: encrypted.iv
      };
      
      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save goal');
      }
      
      const savedGoal = await response.json();
      
      // Create a complete goal object for the UI by combining the server response with decrypted data
      const completeGoal = {
        ...savedGoal,
        ...dataToEncrypt
      };
      
      // Add the new goal to the goals list
      setGoals(prev => [completeGoal, ...prev]);
      
      // Reset the form and close the dialog
      setNewGoalText('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving goal:', error);
      alert('Ошибка при сохранении цели. Пожалуйста, попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle goal completion
  const handleToggleGoalComplete = async (goalId: string) => {
    const goalToUpdate = goals.find(g => g.id === goalId);
    if (!goalToUpdate) return;

    const updatedGoal = {
      ...goalToUpdate,
      isCompleted: !goalToUpdate.isCompleted
    };

    try {
      // Create the data to be encrypted
      const dataToEncrypt = { 
        text: updatedGoal.text,
        isCompleted: updatedGoal.isCompleted 
      };
      
      // Encrypt the data
      if (!encryptionKey) {
        throw new Error('Encryption key is not available');
      }
      
      const encrypted = await Encryption.encryptData(dataToEncrypt, encryptionKey);

      // Optimistically update UI
      setGoals(prev => prev.map(goal => 
        goal.id === goalId ? updatedGoal : goal
      ));

      // Sort goals after updating
      sortGoals();

      // Send the update to the server
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: goalId,
          encryptedData: encrypted.encryptedData,
          iv: encrypted.iv
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }
    } catch (error) {
      console.error('Error updating goal:', error);
      // Revert the optimistic update if there was an error
      setGoals(prev => 
        prev.map(goal => 
          goal.id === goalId ? {...goal, isCompleted: !updatedGoal.isCompleted} : goal
        )
      );
    }
  };

  // Start editing a goal
  const handleStartEdit = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setEditedGoalText(goal.text);
  };

  // Save edited goal
  const handleSaveEdit = async (goalId: string) => {
    if (!editedGoalText.trim()) {
      return;
    }

    const goalToUpdate = goals.find(g => g.id === goalId);
    if (!goalToUpdate) return;

    const updatedGoal = {
      ...goalToUpdate,
      text: editedGoalText
    };

    try {
      // Create the data to be encrypted
      const dataToEncrypt = { 
        text: updatedGoal.text,
        isCompleted: updatedGoal.isCompleted 
      };
      
      // Encrypt the data
      if (!encryptionKey) {
        throw new Error('Encryption key is not available');
      }
      
      const encrypted = await Encryption.encryptData(dataToEncrypt, encryptionKey);

      // Optimistically update UI
      setGoals(prev => prev.map(goal => 
        goal.id === goalId ? updatedGoal : goal
      ));

      // Send the update to the server
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: goalId,
          encryptedData: encrypted.encryptedData,
          iv: encrypted.iv
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      // Reset editing state
      setEditingGoalId(null);
      setEditedGoalText('');
    } catch (error) {
      console.error('Error updating goal:', error);
      // Revert the optimistic update if there was an error
      setGoals(prev => 
        prev.map(goal => 
          goal.id === goalId ? {...goal, text: goalToUpdate.text} : goal
        )
      );
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingGoalId(null);
    setEditedGoalText('');
  };

  // Delete a goal
  const handleDeleteGoal = async (goalId: string) => {
    try {
      // Optimistically remove from UI
      setGoals(prev => prev.filter(goal => goal.id !== goalId));

      // Send the delete request to the server
      const response = await fetch('/api/goals', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: goalId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete goal');
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      // Refresh goals from server to get actual state
      fetchGoals();
    }
  };

  // Fetch goals helper
  const fetchGoals = async () => {
    try {
      const response = await fetch('/api/goals');
      if (!response.ok) {
        throw new Error('Failed to fetch goals');
      }
      
      const data = await response.json();
      const { goals } = data;
      
      if (encryptionKey) {
        const decryptedGoals = await decryptGoals(goals, encryptionKey);
        setGoals(decryptedGoals);
      } else {
        setGoals(goals);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(prev => !prev);
    setEditingGoalId(null);
  };

  // Handle drag and drop
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      setGoals((goals) => {
        const oldIndex = goals.findIndex(goal => goal.id === active.id);
        const newIndex = goals.findIndex(goal => goal.id === over.id);
        
        // Создаем новый порядок
        const reorderedGoals = arrayMove(goals, oldIndex, newIndex).map((goal, index) => ({
          ...goal,
          order: index
        }));
        
        // Отправляем изменения на сервер
        updateGoalOrders(reorderedGoals);
        
        return reorderedGoals;
      });
    }
  };
  
  // Обновление порядка целей на сервере
  const updateGoalOrders = async (reorderedGoals: Goal[]) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goals: reorderedGoals.map(goal => ({ id: goal.id, order: goal.order }))
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update goal orders');
      }
    } catch (error) {
      console.error('Error updating goal orders:', error);
      // Revert to previous state if there was an error
      fetchGoals();
    }
  };

  // Sort goals by completion status and order
  const sortGoals = useCallback(() => {
    setGoals(prev => {
      // Create a copy of the goals array to avoid mutating state directly
      const sortedGoals = [...prev];
      
      // Sort the goals: completed at the bottom, then by order
      sortedGoals.sort((a, b) => {
        // First compare by completion status
        if (a.isCompleted !== b.isCompleted) {
          return a.isCompleted ? 1 : -1;
        }
        // Then sort by order
        return a.order - b.order;
      });
      
      return sortedGoals;
    });
  }, []);

  // Sort goals when completion status changes
  useEffect(() => {
    sortGoals();
  }, [sortGoals]);

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Мои цели</h1>
            
            <div className="flex flex-wrap gap-2 md:flex-nowrap">
              <Button
                onClick={toggleEditMode}
                variant={isEditMode ? "default" : "outline"}
                className="rounded-full flex items-center gap-1"
              >
                {isEditMode ? (
                  <>Готово</>
                ) : (
                  <>
                    <Edit className="h-4 w-4" />
                    Редактировать
                  </>
                )}
              </Button>
              
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 text-white rounded-full hover:bg-green-700">
                    <Plus className="h-5 w-5 mr-1" /> Новая цель
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                  <DialogHeader>
                    <DialogTitle>Добавить новую цель</DialogTitle>
                  </DialogHeader>
                  
                  <form onSubmit={handleAddGoal} className="space-y-4 mt-4">
                    <Input
                      placeholder="Введите текст вашей цели..."
                      value={newGoalText}
                      onChange={(e) => setNewGoalText(e.target.value)}
                      className="w-full"
                    />
                    
                    <DialogFooter className="flex justify-end gap-2 mt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsDialogOpen(false)}
                        className="rounded-full"
                      >
                        Отмена
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !newGoalText.trim()} 
                        className="bg-green-600 text-white rounded-full hover:bg-green-700"
                      >
                        {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {isEditMode && goals.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Grip className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-800 font-medium">Режим редактирования</p>
                <p className="text-blue-600 text-sm">Перетаскивайте плитки с целями, чтобы изменить их порядок. Вы также можете редактировать или удалять цели.</p>
              </div>
            </div>
          )}
          
          {goals.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-gray-500">У вас пока нет целей.</p>
              <p className="text-gray-500 mt-2">Нажмите &quot;Новая цель&quot;, чтобы добавить свою первую цель.</p>
            </div>
          ) : (
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext 
                items={goals.map(goal => goal.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-3">
                  {goals.map((goal, index) => (
                    <SortableGoalItem
                      key={goal.id}
                      goal={goal}
                      isEditMode={isEditMode}
                      editingGoalId={editingGoalId}
                      index={index}
                      onToggleComplete={handleToggleGoalComplete}
                      onStartEdit={handleStartEdit}
                      onSaveEdit={handleSaveEdit}
                      onCancelEdit={handleCancelEdit}
                      onDelete={handleDeleteGoal}
                      editedGoalText={editedGoalText}
                      setEditedGoalText={setEditedGoalText}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </main>
    </div>
  );
}