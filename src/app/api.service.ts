import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';

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
  semesterFilter: string[];
  cache: number;
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
  backendURL = environment.backendURL;

  constructor(private httpClient: HttpClient) {
  }

  async isUserAuthenticated(email: string, password: string) {
    let params = new HttpParams();
    params = params.append('username', email);
    params = params.append('password', password);

    try {
      const result = await this.httpClient.post<UserValidation>(
        this.backendURL + '/login', params, {withCredentials: true}
      ).toPromise();

      sessionStorage.loggedIn = result.data;
      return result.data;
    } catch (e) {
      if (e.status === 401) {
        sessionStorage.loggedIn = false;
        return false;
      } else {
        throw e;
      }
    }
  }

  async getUserModules() {
    return await this.httpClient.get<UserDataResponse>(this.backendURL + '/modules', {withCredentials: true}).toPromise();
  }

  async setSemesterFilter(semesterFilter: string[]) {
    return await this.httpClient.post(this.backendURL + '/modules/filter', semesterFilter, {withCredentials: true}).toPromise();
  }

  async logout() {
    return await this.httpClient.get(this.backendURL + '/logout', {withCredentials: true}).toPromise();
  }
}
