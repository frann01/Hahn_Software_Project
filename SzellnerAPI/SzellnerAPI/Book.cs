using Google.Cloud.Firestore;

namespace SzellnerAPI
{
    [FirestoreData]
    public class Book : FirebaseDoc
    {
        [FirestoreProperty]
        public string? Title { get; set; }

        [FirestoreProperty]
        public string? Author { get; set; }

        [FirestoreProperty]
        public int YearOfPublication { get; set; }

        [FirestoreProperty]
        public int Pages { get; set; }

        [FirestoreProperty]
        public string? Genre { get; set; }
    }
}