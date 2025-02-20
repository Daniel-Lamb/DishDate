import { useState, useEffect } from 'react';
import { List, CreateListInput, UpdateListInput } from '../types/list';
import { Restaurant } from '../types/restaurant';

const STORAGE_KEY = 'dishdate_lists';

export function useLists() {
  const [lists, setLists] = useState<List[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { 
        id: 'favorites',
        userId: 'current-user',
        name: 'Favorites',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        restaurants: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
  }, [lists]);

  const createList = async (input: CreateListInput): Promise<string> => {
    const newList: List = {
      id: `list-${Date.now()}`,
      userId: 'current-user',
      name: input.name,
      description: input.description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      restaurants: []
    };

    setLists(prevLists => [...prevLists, newList]);
    return newList.id;
  };

  const saveToList = async (listId: string, restaurant: Restaurant) => {
    setLists(prevLists =>
      prevLists.map(list => {
        if (list.id === listId && !list.restaurants.some(r => r.id === restaurant.id)) {
          return {
            ...list,
            restaurants: [...list.restaurants, restaurant],
            updatedAt: new Date().toISOString()
          };
        }
        return list;
      })
    );
  };

  const removeFromList = async (listId: string, restaurantId: string) => {
    setLists(prevLists =>
      prevLists.map(list => {
        if (list.id === listId) {
          return {
            ...list,
            restaurants: list.restaurants.filter(r => r.id !== restaurantId),
            updatedAt: new Date().toISOString()
          };
        }
        return list;
      })
    );
  };

  const deleteList = async (listId: string) => {
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
  };

  const updateList = async (listId: string, input: UpdateListInput) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId
          ? {
              ...list,
              ...input,
              updatedAt: new Date().toISOString()
            }
          : list
      )
    );
  };

  const isRestaurantInList = (listId: string, restaurantId: string): boolean => {
    const list = lists.find(l => l.id === listId);
    return list?.restaurants.some(r => r.id === restaurantId) ?? false;
  };

  const getList = (listId: string): List | undefined => {
    return lists.find(list => list.id === listId);
  };

  return {
    lists,
    createList,
    saveToList,
    removeFromList,
    deleteList,
    updateList,
    isRestaurantInList,
    getList
  };
}