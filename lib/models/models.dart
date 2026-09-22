enum UserRole { buyer, seller }
enum OrderStatus { newOrder, processing, ready, delivering, completed, cancelled }

class UserModel {
  final String id, name, email, phone;
  final UserRole role;
  const UserModel({required this.id, required this.name, required this.email, required this.phone, this.role = UserRole.buyer});
  UserModel copyWith({String? name, UserRole? role}) => UserModel(id: id, name: name ?? this.name, email: email, phone: phone, role: role ?? this.role);
}

class ProductModel {
  final String id, sellerId, name, restaurant, category, description, image;
  final int price, discountPrice, stock;
  final double rating;
  final bool isActive;
  const ProductModel({required this.id, required this.sellerId, required this.name, required this.restaurant, required this.category, required this.description, required this.image, required this.price, required this.discountPrice, required this.stock, required this.rating, this.isActive = true});
  ProductModel copyWith({int? stock, bool? isActive}) => ProductModel(id:id,sellerId:sellerId,name:name,restaurant:restaurant,category:category,description:description,image:image,price:price,discountPrice:discountPrice,stock:stock??this.stock,rating:rating,isActive:isActive??this.isActive);
}

class CartItemModel { final ProductModel product; final int quantity; const CartItemModel(this.product, this.quantity); int get total => product.discountPrice * quantity; }
class OrderModel { final String id, buyerId, sellerId, address; final List<CartItemModel> items; final OrderStatus status; final int total; const OrderModel({required this.id,required this.buyerId,required this.sellerId,required this.address,required this.items,required this.status,required this.total}); OrderModel copyWith({OrderStatus? status}) => OrderModel(id:id,buyerId:buyerId,sellerId:sellerId,address:address,items:items,status:status??this.status,total:total); }
class NotificationModel { final String title, description, time; final bool unread; const NotificationModel(this.title,this.description,this.time,{this.unread=true}); }
class ChatModel { final String name, preview; const ChatModel(this.name,this.preview); }
class AddressModel { final String label, address; const AddressModel(this.label,this.address); }
class ReviewModel { final String user, text; final double rating; const ReviewModel(this.user,this.text,this.rating); }
