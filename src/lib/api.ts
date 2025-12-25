const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: UserData;
}

class ApiClient {
  private getHeaders(contentType?: string): Record<string, string> {
    const token = localStorage.getItem('admin-token') || localStorage.getItem('daisy-token');
    const headers: Record<string, string> = {};
    
    // Only set Content-Type for non-multipart requests
    // For multipart/form-data, let the browser set the Content-Type with boundary
    if (contentType && contentType !== 'multipart/form-data') {
      headers['Content-Type'] = contentType;
    } else if (!contentType) {
      headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async post<T>(endpoint: string, body: any, isFormData: boolean = false): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: isFormData ? this.getHeaders('multipart/form-data') : this.getHeaders(),
        body: isFormData ? body : JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message || 'Request failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }
}

export const apiClient = new ApiClient();