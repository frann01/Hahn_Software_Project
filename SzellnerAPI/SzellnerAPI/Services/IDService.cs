using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using Google.Rpc;
using Google.Type;
using Microsoft.AspNetCore.Mvc;
using System;

namespace SzellnerAPI.Services
{
    public class IDService
    {
        private readonly string? CollectionName;
        public FirestoreDb? firestoreDb;
        public FirebaseDoc d;
        public IDService(string CollectionName)
        {
            string filepath = "./FSkey.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);
            firestoreDb = FirestoreDb.Create("booksapi-dtb");
            this.CollectionName = CollectionName;
        }

        public T Get<T>(T record) where T : FirebaseDoc
        {
            DocumentReference docRef = firestoreDb.Collection(CollectionName).Document(record.Id);
            DocumentSnapshot snapshot = docRef.GetSnapshotAsync().GetAwaiter().GetResult();
            if (snapshot.Exists)
            {
                T usr = snapshot.ConvertTo<T>();
                usr.Id = snapshot.Id;
                return usr;
            }
            else
            {
                return null;
            }

        }

        public Book Put(Book record) 
        {
            CollectionReference collection = firestoreDb.Collection(CollectionName);
            DocumentReference docRef = firestoreDb.Collection(CollectionName).Document(record.key);
            DocumentSnapshot snapshot = docRef.GetSnapshotAsync().GetAwaiter().GetResult();
            if (snapshot.Exists)
            {
                collection.Document(record.key).SetAsync(record).GetAwaiter().GetResult();
                return record;
            }
            else
            {
                return null;
            }

        }

        public Array GetAll()
        {
            List<Dictionary<string, object>> collection = new List<Dictionary<string, object>>();
            Query allBooks = firestoreDb.Collection(CollectionName);
            QuerySnapshot allBooksCollection = allBooks.GetSnapshotAsync().GetAwaiter().GetResult();
            foreach (DocumentSnapshot documentSnapshot in allBooksCollection.Documents)
            {
                Dictionary<string, object> book = documentSnapshot.ToDictionary();
                book["id"] = documentSnapshot.Id;   
                collection.Add(book);
            }
            return collection.ToArray();
        }

        public Book Add(Book record)
        {
            
            try
            {
       
                CollectionReference collection = firestoreDb.Collection(CollectionName);
                string Id = RandomString(20);
                Book v = record;
                v.key = Id;
                collection.Document(Id).SetAsync(v).GetAwaiter().GetResult();
                //DocumentReference newDocument = collection.AddAsync(record).GetAwaiter().GetResult();
                return record;
            }
            catch 
            {
                return null;
            }
        }

        public Google.Cloud.Firestore.WriteResult Delete(FirebaseDoc record)
        {
            
            try 
            {
                DocumentReference docRef = firestoreDb.Collection(CollectionName).Document(record.Id);
                return docRef.DeleteAsync().GetAwaiter().GetResult();
            }
            catch 
            {
                return null;
            }
        }

        public static string RandomString(int length)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[length];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            var finalString = new String(stringChars);

            return finalString;
        }
    }
}
