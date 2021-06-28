import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BaseDatabaseModels } from '../models/dto';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userid: any;

  constructor(private store: AngularFirestore) {
    this.userid = 1;
  }

  public createId<T extends BaseDatabaseModels>(collection: string, data: T): Promise<void> {
    return this.store.doc<T>(`${collection}/${data.id}`).set(this.addCreated(data));
  };

  public createInnerId<T extends BaseDatabaseModels>(collection: string, id: string, subcollection: string, subid: T, idsub: string): Promise<void>{
    return this.store.doc<T>(`${collection}/${id}/${subcollection}/${idsub}`).set(this.addCreated(subid));
  }

  public updateInnerId<T extends BaseDatabaseModels>(collection: string, id: string, subcollection: string, subid: T, idsub: string, innerel: string): Promise<void>{
    return this.store.doc<T>(`${collection}/${id}/${subcollection}/${idsub}`).update(this.updateCreated(subid));
  }

  public getServices<T extends BaseDatabaseModels>(collection: string, id: string, subcollection: string, idsub:string): Observable<T[]>{
    return this.store.collection<T>(`${collection}/${id}/${subcollection}`).valueChanges({ idField: 'id' }).pipe(take(1));
  }

  public update<T extends BaseDatabaseModels>(collection: string, id: string, document: Partial<T>): Promise<void> {
    return this.store.doc<T>(`${collection}/${id}`).update(this.updateCreated(document));
  };
  public updateField<T extends BaseDatabaseModels>(collection: string, subCollectionName: string, id: string, document: Partial<T>): Promise<any> {
    return this.store.collection(collection).doc(id).collection(subCollectionName).add(this.addCreated(document))
  };
  public updateSubcollection<T extends BaseDatabaseModels>(collection: string, subCollectionName: string, id: string,sid: string, document: Partial<T>): Promise<any> {
    return this.store.doc<T>(`${collection}/${id}/${subCollectionName}/${sid}`).update(this.updateCreated(document));
  };

  public removeField<T extends BaseDatabaseModels>(collection: string, subCollectionName: string, id: string, document: Partial<T>): Promise<any> {
    console.log('delete up',this.store.doc<T>(`${collection}/${id}/${subCollectionName}/${id}`))
    return this.store.doc<T>(`${collection}/${id}/${subCollectionName}/${id}`).delete()
  };


  // public delete<T extends BaseDatabaseModesl>(collection: string, id: string): Promise<any> {
  //   return this.store.doc<T>(`${collection}/${id}`).delete();
  // }

  public findCategories<T extends BaseDatabaseModels>(collection: string): Observable<T[]> {
    return this.store.collection<T>(collection).valueChanges({ idField: 'id' }).pipe(take(1));
  };


  public getdata<T extends BaseDatabaseModels>(collection: string, id: string, subCollectionName: string, document: Partial<T>): Observable<T[]> {
    //console.log('resss')
    return this.store.collection<T>(`${collection}/${id}/${subCollectionName}`).valueChanges({ idField: 'id' }).pipe(take(1));
  }


  public getdatacopy<T extends BaseDatabaseModels>(collection: string, id: string, subCollectionName: string): Observable<T[]> {
    //console.log('resss')
    return this.store.collection<T>(`${collection}/${id}/${subCollectionName}`).valueChanges({ idField: 'id' }).pipe(take(1));
  }

  public uploadFile(folderName: string, downloadUrl: string, fileName: string): Promise<any> {
    return this.store.collection<{ downloadUrl: string; fileName: string; uid: string; }>(`fileReferences`).add({ downloadUrl, fileName, uid: this.userid });
  };


  public addCreated(data) {
    return {
      ...data, createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.default.firestore.FieldValue.serverTimestamp()
    };

  }
  public updateCreated(data) {
    console.log('data',data)
    return {
      ...data, updatedAt: firebase.default.firestore.FieldValue.serverTimestamp(),
      //...data, deleteAt: firebase.default.firestore.FieldValue.delete(),
    };
  }

  public removeCreated(data){
    return {
      ...data, deleteAt: firebase.default.firestore.FieldValue.delete(),
    }
  }

  public async create<T extends BaseDatabaseModels>(collection: string, data: T): Promise<firebase.default.firestore.DocumentSnapshot> {
    const doc = await this.store.collection<T>(collection).add(this.addCreated(data));
    return doc.get();
  }
  snapshotToDataConverter(query: Promise<firebase.default.firestore.DocumentSnapshot<firebase.default.firestore.DocumentData>>) {
    return new Observable((observer) => {
      query.then(ref => {
        const obj = ref.data();
        obj.id = ref.id;
        observer.next(obj);
      }).catch(err => {
        observer.error(err);

      });
    })
  }

  Category(Categories): Observable<any> {
    return this.snapshotToDataConverter(this.create('Categories', Categories));
  }

  book(booking): Observable<any> {
    return this.snapshotToDataConverter(this.create('booking', booking));
  }
  public getOne<T extends BaseDatabaseModels>(collection: string, id: string): Observable<T> {
    return this.store.doc<T>(`${collection}/${id}`).valueChanges().pipe(take(1));
  }
  public findAll<T extends BaseDatabaseModels>(collection: string): Observable<T[]> {
    return this.store.collection<T>(collection).valueChanges({ idField: 'id' }).pipe(take(1));
  }
  public getuser<T extends BaseDatabaseModels>(collection: string, document: Partial<T>): Observable<T[]> {
    return this.store.collection<T>(`${collection}`).valueChanges({ idField: 'id' }).pipe(take(1));
  }
  
}