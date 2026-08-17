const products=[
{name:"سيروم العناية بالبشرة",cat:"عناية بالبشرة",price:690,old:790,icon:"✦",offer:true},
{name:"كريم ترطيب فاخر",cat:"عناية بالبشرة",price:450,old:520,icon:"◇",offer:true},
{name:"مجموعة عناية بالشعر",cat:"العناية بالشعر",price:850,old:990,icon:"⌁",offer:true},
{name:"فيتامينات يومية",cat:"فيتامينات",price:390,old:450,icon:"＋",offer:true},
{name:"واقي شمس Premium",cat:"عناية بالبشرة",price:560,old:650,icon:"☼",offer:false},
{name:"شامبو العناية المتقدمة",cat:"العناية بالشعر",price:320,old:0,icon:"⌁",offer:false},
{name:"Multivitamin Complex",cat:"فيتامينات",price:480,old:0,icon:"✚",offer:false},
{name:"عطر Signature",cat:"عطور",price:1200,old:1400,icon:"◌",offer:false}
];
let category="all", cart=[];
function productCard(p){
return `<article class="product"><div class="product-image">${p.icon}</div>${p.offer?'<span class="badge">عرض</span>':''}<div class="product-body"><span class="product-cat">${p.cat}</span><h3>${p.name}</h3><div class="price"><div><strong>${p.price.toLocaleString('ar-EG')} ج.م</strong>${p.old?` <del>${p.old} ج.م</del>`:''}</div><button class="add" onclick='addCart(${JSON.stringify(p.name)})'>+ أضف</button></div></div></article>`
}
function renderProducts(){
const q=document.getElementById("search").value.trim().toLowerCase();
const list=products.filter(p=>(category==="all"||p.cat===category)&&(!q||`${p.name} ${p.cat}`.toLowerCase().includes(q)));
document.getElementById("productGrid").innerHTML=list.length?list.map(productCard).join(""):'<div class="empty" style="grid-column:1/-1">لا توجد منتجات مطابقة للبحث.</div>';
document.getElementById("offerGrid").innerHTML=products.filter(p=>p.offer).slice(0,4).map(productCard).join("");
}
function filterCategory(c,btn){
category=c;
document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));
if(btn)btn.classList.add("active");
renderProducts();
document.getElementById("products").scrollIntoView({behavior:"smooth"});
}
function focusSearch(){document.getElementById("search").focus();document.querySelector(".search-wrap").scrollIntoView({behavior:"smooth"});}
function addCart(name){const p=products.find(x=>x.name===name);cart.push(p);document.getElementById("cartCount").textContent=cart.length;openCart();}
function openCart(){document.getElementById("cartModal").classList.add("show");renderCart();}
function closeCart(){document.getElementById("cartModal").classList.remove("show");}

const branches = [
  {name:"فرع النادي البحري", address:"بجوار ماركت زمزم", phone:"201032400040"},
  {name:"فرع شارع الجمهورية", address:"آخر شارع الجمهورية أمام بلبن", phone:"201000418005"},
  {name:"فرع الحويتي", address:"أمام مستشفى الهلال الأحمر", phone:"201070900011"},
  {name:"فرع أسيوط سوهاج", address:"في المجمع", phone:"201035500046"}
];

function startWhatsAppOrder(){
  if(!cart.length){
    alert("السلة فارغة. أضف منتجًا واحدًا على الأقل قبل تأكيد الطلب.");
    return;
  }
  document.getElementById("branchModal").classList.add("show");
}

function closeBranchModal(){
  document.getElementById("branchModal").classList.remove("show");
}

function sendWhatsAppOrder(index){
  const branch = branches[index];
  if(!branch || !cart.length) return;

  const lines = cart.map((p,i) => `${i+1}- ${p.name} × 1 — ${p.price.toLocaleString("ar-EG")} ج.م`);
  const total = cart.reduce((s,p)=>s+p.price,0);

  const message =
`السلام عليكم 👋
أريد عمل طلب من صيدليات د/زياد عاشور.

الفرع المختار: ${branch.name}
العنوان: ${branch.address}

المنتجات:
${lines.join("\n")}

الإجمالي: ${total.toLocaleString("ar-EG")} ج.م

من فضلكم تأكيد توفر المنتجات والطلب. شكرًا ❤️`;

  const url = `https://wa.me/${branch.phone}?text=${encodeURIComponent(message)}`;
  closeBranchModal();
  window.open(url, "_blank");
}
function renderCart(){
const box=document.getElementById("cartItems");
if(!cart.length){box.innerHTML='<div class="empty">السلة فارغة حاليًا.</div>';document.getElementById("cartTotal").textContent="0 ج.م";return}
box.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><span>${p.price} ج.م <button class="add" onclick="removeCart(${i})">حذف</button></span></div>`).join("");
document.getElementById("cartTotal").textContent=cart.reduce((s,p)=>s+p.price,0).toLocaleString("ar-EG")+" ج.م";
}
function removeCart(i){cart.splice(i,1);document.getElementById("cartCount").textContent=cart.length;renderCart();}
renderProducts();

