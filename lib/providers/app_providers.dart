import 'package:flutter/foundation.dart';
import '../models/models.dart';
import '../services/services.dart';

class AppState extends ChangeNotifier {
  final products = ProductService().catalog();
  final notifications = NotificationService().items;
  final chats = ChatService().chats;
  UserModel user = const UserModel(id:'buyer-1',name:'Andini Pratama',email:'andini@usu.ac.id',phone:'08123456789');
  UserRole mode = UserRole.buyer;
  int tab = 0;
  final List<CartItemModel> cart = [];
  List<ProductModel> recommendations = [];
  void setTab(int value){ tab=value; notifyListeners(); }
  void add(ProductModel product){ final i=cart.indexWhere((x)=>x.product.id==product.id); if(i<0) cart.add(CartItemModel(product,1)); else cart[i]=CartItemModel(product,cart[i].quantity+1); notifyListeners(); }
  void becomeSeller(){ user=user.copyWith(role:UserRole.seller); mode=UserRole.seller; notifyListeners(); }
  void switchMode(){ mode=mode==UserRole.buyer?UserRole.seller:UserRole.buyer; notifyListeners(); }
  void recommend(String category,int budget){ recommendations=RecommendationService().recommend(products,category,budget); notifyListeners(); }
}
