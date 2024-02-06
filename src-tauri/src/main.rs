// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;

#[tauri::command]
fn set_env_var(key: &str, value: &str) {
    env::set_var(key, value);
}


#[tauri::command]
fn get_env_var(key: &str) -> Option<String> {
    match env::var(key) {
        Ok(value) => Some(value),
        Err(_) => None,
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![set_env_var, get_env_var])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
