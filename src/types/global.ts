declare interface Credentials {
  email?: string | undefined;
  password?: string | undefined;
  provider?: "bitbucket" | "github" | "gitlab" | "google" | undefined;
}

declare interface Todo {
  id?: number;
  user_id: string;
  task: string;
  is_complete?: boolean;
  inserted_at?: string;
}

declare enum WeekDay {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Weekend,
}


declare interface WeeklyTodo {
  id?: number;
  user_id: string;
  task: string;
  is_complete?: boolean;
  inserted_at?: string;
  week_start: string;
  week_day: string;
  is_appointment: boolean;
}

declare interface Note {
  id?: number;
  user_id: string;
  note: string;
  week_start: string;
}

declare interface Expense {
  id?: number;
  user_id?: string;
  week_start?: string;
  rent?: number;
  bills?: number;
  food?: number;
  transport?: number;
  activities?: number;
  other?: number;
  savings?: number;
}

declare interface Goal {
  id?: number;
  user_id?: string;
  week_start?: string;
  title?: string;
  is_complete: boolean;
}