// import { map } from "rxjs/operators";
import {
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SchoolsService } from "app/schools.service";

// import { Constant } from "./Constant";

@Injectable({
  providedIn: "root"
})
export class ApiIntegService {
  private users: string;
  private schools: string;

  constructor(private http: HttpClient, private _configuration: SchoolsService) {
    this.users = _configuration.ServerWithApiUrl + "users/";
    this.schools = _configuration.ServerWithApiUrl + "schools/";
  }

  /*
  user management
  */
  public getAllUsers<T>(): Observable<T> {
    return this.http.get<T>(this.users);
  }

  public getSingleUser<T>(id: number): Observable<T> {
    return this.http.get<T>(this.users + id);
  }

  public addUser<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.users, toAdd);
  }

  public updateUser<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http.put<T>(this.users + id, JSON.stringify(itemToUpdate));
  }

  public deleteUser<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.users + id);
  }

  /*
  schools management
  */
  public getAllSchools<T>(): Observable<T> {
    return this.http.get<T>(this.users);
  }

  public getSingleSchool<T>(id: number): Observable<T> {
    return this.http.get<T>(this.users + id);
  }

  public addSchool<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.users, toAdd);
  }

  public updateSchool<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http.put<T>(this.users + id, JSON.stringify(itemToUpdate));
  }

  public deleteSchool<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.users + id);
  }
}
@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = req.clone({ headers: req.headers.set("Accept", "application/json") });
    return next.handle(req);
  }
}
