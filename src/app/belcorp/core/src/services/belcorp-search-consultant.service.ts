import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthConfig, OccEndpointsService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchConsultant, SearchUbigeo } from '../model/belcorp-search-consultant.model';
@Injectable()
export class SearchConsultantService {
  constructor(
    private http: HttpClient,
    private occEndpointService: OccEndpointsService,
    protected config: AuthConfig
  ) {}

  public getBelcorpToken(): Observable<any> {
    const headers = new HttpHeaders({
      'cx-use-client-token': 'true',
    });

    return this.http.get(this.occEndpointService.getUrl('/consultant/oauth/token'), {
      headers,
    });
  }

  public getSearchConsultant(form: any, type: string, token: string): Observable<SearchConsultant[]> {
    const header = new HttpHeaders({ 'Content-Type': 'application', 'x-access-token': token });
    let params;
    if (type === 'PERSON') {
      params = new HttpParams().set('first_name', form.firstname).set('last_name', form.lastname);
      // .set('ubigeo', form.distrito);
    }
    if (type === 'CODE') {
      params = new HttpParams().set('consultant_code', form.code);
    }
    if (type === 'PHONE') {
      params = new HttpParams().set('phone', form.phone);
    }

    return this.http.get(`https://api-qa.belcorp.biz/consultants/PE?` + params, { headers: header }).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response;
        }
        if (Object.keys(response).length === 0 && response.constructor === Object) {
          return Array();
        }
        return Array(response);
      })
    );
  }

  public getUbigeo(token: string): Observable<SearchUbigeo[]> {
    const header = new HttpHeaders({ 'Content-Type': 'application', 'x-access-token': token });
    return this.http
      .get<SearchUbigeo[]>('https://api-qa.belcorp.biz/countries/PE?show_ubigeo=true', { headers: header })
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
