using Google.Cloud.Firestore;
using Google.Rpc;
using Google.Type;
using Microsoft.AspNetCore.Mvc;

namespace SzellnerAPI.Services
{
    public class IDService
    {
        private readonly string? CollectionName;
        public FirestoreDb? firestoreDb;

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

        public T Add<T>(T record) where T : FirebaseDoc
        {
            
            try
            {
                CollectionReference collection = firestoreDb.Collection(CollectionName);
                DocumentReference newDocument = collection.AddAsync(record).GetAwaiter().GetResult();
                return record;
            }
            catch 
            {
                return null;
            }
        }

        public WriteResult Delete(FirebaseDoc record)
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
    }
}
