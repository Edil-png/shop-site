"use client";

import { useState } from "react";
import {
  Search,
  UserPlus,
  MoreHorizontal,
  Mail,
  Shield,
  ShieldCheck,
  User,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Filter,
  ArrowUpDown
} from "lucide-react";

// Типизация пользователя
interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "customer";
  status: "active" | "suspended";
  lastLogin: string;
  avatar?: string;
}

const users: UserData[] = [
  {
    id: "1",
    name: "Александр Иванов",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    lastLogin: "2 часа назад",
  },
  {
    id: "2",
    name: "Мария Петрова",
    email: "masha@tech.ru",
    role: "manager",
    status: "active",
    lastLogin: "Вчера, 15:40",
  },
  {
    id: "3",
    name: "Дмитрий Волков",
    email: "volk_d@mail.ru",
    role: "customer",
    status: "suspended",
    lastLogin: "3 дня назад",
  },
  {
    id: "4",
    name: "Елена Светлова",
    email: "elena@shop.com",
    role: "customer",
    status: "active",
    lastLogin: "5 минут назад",
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Пользователи</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Управление правами доступа и учетными записями ({users.length})
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
          <UserPlus className="h-4 w-4" />
          Пригласить коллегу
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-3 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500 transition-all text-sm"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">Все роли</option>
            <option value="admin">Администраторы</option>
            <option value="manager">Менеджеры</option>
            <option value="customer">Клиенты</option>
          </select>
          <button className="p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Filter className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Пользователь</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Роль</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Статус</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Последний вход</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold border border-blue-50 dark:border-blue-900/50">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {user.status === "active" ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-500" />
                      )}
                      <span className={`text-sm ${user.status === "active" ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                        {user.status === "active" ? "Активен" : "Заблокирован"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-blue-600 rounded-lg transition-all" title="Редактировать">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 hover:bg-rose-50 dark:hover:bg-rose-900/30 text-gray-400 hover:text-rose-600 rounded-lg transition-all" title="Удалить">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between bg-gray-50/30 dark:bg-gray-900/10">
          <span className="text-xs text-gray-500 italic">Показано {filteredUsers.length} из {users.length} записей</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-xs disabled:opacity-50" disabled>Назад</button>
            <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md text-xs">Вперед</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Хелпер для отрисовки бейджа роли
function getRoleBadge(role: string) {
  const configs = {
    admin: {
      label: "Админ",
      icon: ShieldCheck,
      class: "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
    },
    manager: {
      label: "Менеджер",
      icon: Shield,
      class: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
    },
    customer: {
      label: "Клиент",
      icon: User,
      class: "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600",
    },
  };

  const config = configs[role as keyof typeof configs] || configs.customer;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-tight ${config.class}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}