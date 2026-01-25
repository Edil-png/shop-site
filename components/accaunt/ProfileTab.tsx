"use client";

import { useState, useEffect } from "react";
import { Camera, Check, Edit, X } from "lucide-react";

export function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [tempData, setTempData] = useState<any>({});

  // Получаем данные пользователя из sessionStorage при монтировании
  useEffect(() => {
    const userString = sessionStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      setUserData(user);
      setTempData(user); // временные данные для редактирования
    }
  }, []);

  // Обработчик изменения полей формы
  const handleInputChange = (field: string, value: any) => {
    setTempData((prev: any) => ({ ...prev, [field]: value }));
  };

  // Сохраняем изменения
  const handleSave = () => {
    setUserData(tempData);
    sessionStorage.setItem("user", JSON.stringify(tempData));
    setIsEditing(false);
  };

  // Отмена изменений
  const handleCancel = () => {
    setTempData(userData);
    setIsEditing(false);
  };

  if (!userData) return <div>Загрузка...</div>;

  return (
    <div className="space-y-6">
      {/* Заголовок и кнопки управления */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Профиль
        </h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm text-sm font-medium"
          >
            <Edit className="h-4 w-4" />
            Редактировать
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all text-sm font-medium"
            >
              <Check className="h-4 w-4" />
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl transition-all text-sm font-medium"
            >
              <X className="h-4 w-4" />
              Отмена
            </button>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Секция Аватара */}
        <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 p-2 bg-white dark:bg-gray-700 rounded-full shadow-lg border border-gray-100 dark:border-gray-600 hover:scale-110 transition-transform">
                <Camera className="h-4 w-4 text-blue-600" />
              </button>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {userData.name}
            </h3>
            <p className="text-gray-500 text-sm">
              Покупатель с {userData.createdAt?.slice(0, 10) || "неизвестно"}
            </p>
          </div>
        </div>

        {/* Сетка полей формы */}
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {[
            { label: "Имя", field: "name", type: "text" },
            { label: "Email", field: "email", type: "email" },
            { label: "Телефон", field: "phone", type: "tel" },
            {
              label: "Дата рождения",
              field: "birthDate",
              type: "text",
              placeholder: "ДД.ММ.ГГГГ",
            },
          ].map((item) => (
            <div key={item.field} className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-400 ml-1">
                {item.label}
              </label>
              {isEditing ? (
                <input
                  type={item.type}
                  value={tempData[item.field] || ""}
                  onChange={(e) =>
                    handleInputChange(item.field, e.target.value)
                  }
                  placeholder={item.placeholder}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-transparent rounded-xl text-gray-900 dark:text-white font-medium">
                  {userData[item.field] || "-"}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
