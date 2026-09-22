import '../models/models.dart';

class ProductService {
  List<ProductModel> catalog() => const [
    ProductModel(id:'1',sellerId:'seller-1',name:'Ayam Geprek Mozzarella',restaurant:'Warung USU',category:'Makanan Berat',description:'Ayam crispy, sambal, dan mozzarella leleh.',image:'assets/food/ayam-geprek-mozzarella.png',price:30000,discountPrice:24000,stock:20,rating:4.8),
    ProductModel(id:'2',sellerId:'seller-1',name:'Es Kopi Susu Gula Aren',restaurant:'Kopi Kampus',category:'Minuman Segar',description:'Kopi susu creamy dengan gula aren.',image:'assets/food/es-kopi-susu-gula-aren.png',price:22000,discountPrice:18000,stock:30,rating:4.7),
    ProductModel(id:'3',sellerId:'seller-1',name:'Dimsum Sumit',restaurant:'Dimsum Sumit',category:'Camilan',description:'Dimsum ayam hangat dengan saus spesial.',image:'assets/food/dimsum-ayam.png',price:25000,discountPrice:22000,stock:16,rating:4.6),
    ProductModel(id:'4',sellerId:'seller-1',name:'Nasi Rendang Padang',restaurant:'Raso Minang',category:'Makanan Berat',description:'Rendang sapi autentik dengan nasi hangat.',image:'assets/food/nasi-rendang-padang.png',price:32000,discountPrice:28000,stock:12,rating:4.9),
    ProductModel(id:'5',sellerId:'seller-1',name:'Mie Aceh Spesial',restaurant:'Aceh Corner',category:'Makanan Berat',description:'Mie Aceh gurih dan kaya rempah.',image:'assets/food/mie-ayam-ceker.png',price:26000,discountPrice:23000,stock:18,rating:4.5),
    ProductModel(id:'6',sellerId:'seller-1',name:'Kopi Gayo Aren',restaurant:'Kopi Kampus',category:'Minuman Segar',description:'Kopi Gayo dengan aroma khas.',image:'assets/food/es-kopi-susu-gula-aren.png',price:20000,discountPrice:17000,stock:24,rating:4.8),
    ProductModel(id:'7',sellerId:'seller-1',name:'Roti Cane',restaurant:'Raso Minang',category:'Jajanan Lokal',description:'Roti cane lembut dengan kuah kari.',image:'assets/food/pisang-goreng-keju.png',price:18000,discountPrice:15000,stock:15,rating:4.4),
    ProductModel(id:'8',sellerId:'seller-1',name:'Bika Ambon Mini',restaurant:'Oleh Oleh Medan',category:'Dessert',description:'Bika ambon mini legit dan harum.',image:'assets/food/martabak-manis.png',price:16000,discountPrice:14000,stock:22,rating:4.6),
    ProductModel(id:'9',sellerId:'seller-1',name:'Soto Medan',restaurant:'Soto Medan Kak Ida',category:'Makanan Berat',description:'Soto kuah santan khas Medan.',image:'assets/food/soto-ayam-lamongan.png',price:24000,discountPrice:21000,stock:14,rating:4.7),
    ProductModel(id:'10',sellerId:'seller-1',name:'Nasi Goreng Kampung',restaurant:'Dapur Kampus',category:'Makanan Berat',description:'Nasi goreng kampung dengan telur.',image:'assets/food/nasi-goreng-kampung.png',price:22000,discountPrice:19000,stock:20,rating:4.5),
  ];
}
class RecommendationService { List<ProductModel> recommend(List<ProductModel> p, String category, int budget) => p.where((x)=>(category=='Bebas'||x.category==category)&&x.discountPrice<=budget).toList()..sort((a,b)=>b.rating.compareTo(a.rating)); }
class AuthService { UserModel? login() => const UserModel(id:'buyer-1',name:'Andini Pratama',email:'andini@usu.ac.id',phone:'08123456789'); }
class CartService {}
class OrderService {}
class NotificationService { List<NotificationModel> get items => const [NotificationModel('Pesanan sedang dalam perjalanan','Pesanan #GB1024 sedang menuju alamatmu.','10 menit lalu'),NotificationModel('Promo 25% untuk Ayam Geprek','Gunakan voucher hari ini.','1 jam lalu')]; }
class ChatService { List<ChatModel> get chats => const [ChatModel('Andi Pratama','Pesanan saya sudah diproses?'),ChatModel('Budi','Masih bisa tambah sambal?'),ChatModel('Siti','Berapa lama kira-kira pesanannya?')]; }
