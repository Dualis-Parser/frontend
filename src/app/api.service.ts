import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

interface UserValidation {
  code: number;
  data: boolean;
  description: string;
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
      const result = await this.httpClient.get<UserValidation>('https://api.gahr.dev/dualis/user/validate', {params}).toPromise();
      return result.code === 200 && result.data;
    } catch (e) {
      return false;
    }
  }

  async getUserModules(email: string, password: string) {
    let params = new HttpParams();
    params = params.append('username', email);
    params = params.append('password', password);

    return await this.httpClient.get<UserDataResponse>('http://localhost:8081/dualis/user', {params}).toPromise();
  }
}
