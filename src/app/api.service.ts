import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

interface UserValidation {
  data: boolean;
}

interface UserDataResponse {
  code: number;
  description: string;
  data: Data;
}

interface Data {
  modules: Module[];
  name: string;
  semesters: string[];
  username: string;
}

interface Module {
  credits: string;
  final_grade: string;
  grades: Grade[];
  module_name: string;
  module_no: string;
  passed: boolean;
  semesters: string;
}

interface Grade {
  grade: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {
  }

  async isUserAuthenticated(email: string, password: string) {
    let params = new HttpParams();
    params = params.append('username', email);
    params = params.append('password', password);

    try {
      const result = await this.httpClient.post<UserValidation>(
        'https://dualis.gahr.dev/backend/login', params, {withCredentials: true}
      ).toPromise();

      sessionStorage.loggedIn = result.data;
      return result.data;
    } catch (e) {
      sessionStorage.loggedIn = false;
      return false;
    }
  }

  async getUserModules() {
    return await this.httpClient.get<UserDataResponse>('https://dualis.gahr.dev/backend/modules', {withCredentials: true}).toPromise();
  }

  async logout() {
    try {
      return await this.httpClient.get('https://dualis.gahr.dev/backend/logout', {withCredentials: true}).toPromise();
    } catch (e) {
    }
  }
}
