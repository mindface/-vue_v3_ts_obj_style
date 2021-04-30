export interface Headers {
  method: string;
  headers: object;
  credentials: string;
  mode: string;
  body: object[];
}

export class ApiFetch {
  private seturl: string;
  private data: any;

  constructor(_seturl: string, _data:any) {
    this.seturl = _seturl;
    this.data = _data;
  }
  async init() {
    const response = await fetch(this.seturl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // "X-CSRFToken": csfTokn
      },
      credentials: 'same-origin',
      mode: 'cors',
      body: JSON.stringify(this.data)
    });
    if (!response.ok) {
      console.log(await response.json());
    } else {
      return await response.json();
    }
  }
}

export class ApiFetchGet {
  private seturl: string;

  constructor(_seturl: string) {
    this.seturl = _seturl;
  }
  public async init(): Promise<any> {
    const response = await fetch(this.seturl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-API-KEY":"6HkKf6zXIQ9g5U7nD8nGvh4enznFY6ASV8qCIC57"
      },
      credentials: 'same-origin',
      mode: 'cors',
    });
    return new Promise( (resolve) => {
      if (!response.ok) {
        console.log(response.json());
      } else {
        resolve(response.json());
      }
    })
  }
}
