using Google.Cloud.Firestore;

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

        public T Get<T>(T record) where T : FIrebaseDoc
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
    }
}
