// Z-Store demo frontend. No real authentication, backend, or payments.
const products = [
  {id:"p01",name:"Headphone Studio",category:"Teknologi",price:349000,emoji:"🎧",tag:"POPULAR",bg:"#e9e4f4"},
  {id:"p02",name:"Smartwatch Nova",category:"Teknologi",price:529000,emoji:"⌚",tag:"NEW",bg:"#e1ece7"},
  {id:"p03",name:"Tumbler Daily",category:"Lifestyle",price:89000,emoji:"🥤",tag:"BEST VALUE",bg:"#f3e9dc"},
  {id:"p04",name:"Backpack Mono",category:"Lifestyle",price:279000,emoji:"🎒",tag:"",bg:"#e6e9df"},
  {id:"p05",name:"Keyboard Mini",category:"Teknologi",price:419000,emoji:"⌨️",tag:"POPULAR",bg:"#e8edf4"},
  {id:"p06",name:"Desk Lamp",category:"Aksesori",price:159000,emoji:"💡",tag:"",bg:"#f1e9d8"},
  {id:"p07",name:"Phone Stand",category:"Aksesori",price:59000,emoji:"📱",tag:"",bg:"#e6eeea"},
  {id:"p08",name:"Sneaker Cloud",category:"Lifestyle",price:459000,emoji:"👟",tag:"NEW",bg:"#f0e6e4"}
];
const money = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
let activeCategory = "Semua";
let cart = readCart();

function readCart(){
  try { const value = JSON.parse(localStorage.getItem("zstore_demo_cart") || "[]"); return Array.isArray(value) ? value.filter(x => products.some(p => p.id === x.id) && Number.isInteger(x.qty) && x.qty > 0 && x.qty < 100) : []; }
  catch { return []; }
}
function saveCart(){ localStorage.setItem("zstore_demo_cart", JSON.stringify(cart)); }
function renderProducts(){
  const query = document.querySelector("#search").value.trim().toLocaleLowerCase("id");
  const visible = products.filter(p => (activeCategory === "Semua" || p.category === activeCategory) && p.name.toLocaleLowerCase("id").includes(query));
  const grid = document.querySelector("#product-grid");
  grid.replaceChildren();
  if (!visible.length){ const empty=document.createElement("p"); empty.className="empty-state"; empty.textContent="Produk tidak ditemukan. Coba kata kunci lain."; grid.append(empty); return; }
  visible.forEach(p => {
    const card=document.createElement("article"); card.className="product-card";
    const visual=document.createElement("div"); visual.className="product-visual"; visual.style.background=p.bg;
    const emoji=document.createElement("span"); emoji.className="emoji"; emoji.textContent=p.emoji; visual.append(emoji);
    if(p.tag){const tag=document.createElement("span");tag.className="product-tag";tag.textContent=p.tag;visual.append(tag);}
    const info=document.createElement("div");info.className="product-info";
    const cat=document.createElement("div");cat.className="product-category";cat.textContent=p.category;
    const name=document.createElement("h3");name.className="product-name";name.textContent=p.name;
    const foot=document.createElement("div");foot.className="product-foot";
    const price=document.createElement("span");price.className="price";price.textContent=money(p.price);
    const add=document.createElement("button");add.className="add-button";add.type="button";add.textContent="+";add.setAttribute("aria-label",`Tambah ${p.name} ke keranjang`);add.addEventListener("click",()=>addToCart(p.id));
    foot.append(price,add);info.append(cat,name,foot);card.append(visual,info);grid.append(card);
  });
}
function addToCart(id){
  const item=cart.find(x=>x.id===id);
  if(item){if(item.qty<99)item.qty++;}else cart.push({id,qty:1});
  saveCart();renderCart();
}
function changeQty(id,delta){
  const item=cart.find(x=>x.id===id);if(!item)return;
  item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);if(item.qty>99)item.qty=99;
  saveCart();renderCart();
}
function renderCart(){
  const count=cart.reduce((s,x)=>s+x.qty,0);
  document.querySelector("#cart-count").textContent=count;
  const wrap=document.querySelector("#cart-items");wrap.replaceChildren();
  if(!cart.length){const msg=document.createElement("p");msg.className="empty-state";msg.textContent="Keranjang masih kosong.";wrap.append(msg);}
  cart.forEach(item=>{
    const p=products.find(x=>x.id===item.id);if(!p)return;
    const row=document.createElement("div");row.className="cart-row";
    const thumb=document.createElement("div");thumb.className="cart-thumb";thumb.style.background=p.bg;thumb.textContent=p.emoji;
    const details=document.createElement("div");const name=document.createElement("strong");name.textContent=p.name;const price=document.createElement("small");price.textContent=money(p.price);
    const controls=document.createElement("div");controls.className="qty-controls";
    const minus=document.createElement("button");minus.textContent="−";minus.setAttribute("aria-label","Kurangi jumlah");minus.addEventListener("click",()=>changeQty(p.id,-1));
    const qty=document.createElement("small");qty.textContent=item.qty;
    const plus=document.createElement("button");plus.textContent="+";plus.setAttribute("aria-label","Tambah jumlah");plus.addEventListener("click",()=>changeQty(p.id,1));
    controls.append(minus,qty,plus);details.append(name,price,controls);
    const subtotal=document.createElement("strong");subtotal.textContent=money(p.price*item.qty);row.append(thumb,details,subtotal);wrap.append(row);
  });
  const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
  document.querySelector("#cart-total").textContent=money(total);
}
function openCart(){document.querySelector("#overlay").hidden=false;document.querySelector("#cart-drawer").classList.add("open");document.querySelector("#cart-drawer").setAttribute("aria-hidden","false");}
function closeCart(){document.querySelector("#overlay").hidden=true;document.querySelector("#cart-drawer").classList.remove("open");document.querySelector("#cart-drawer").setAttribute("aria-hidden","true");}
function notice(title,message){document.querySelector("#notice-title").textContent=title;document.querySelector("#notice-message").textContent=message;document.querySelector("#notice-dialog").showModal();}

document.querySelector("#filters").addEventListener("click",e=>{const btn=e.target.closest("button[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===btn));renderProducts();});
document.querySelector("#search").addEventListener("input",renderProducts);
document.querySelector("#search-focus").addEventListener("click",()=>{document.querySelector("#search").focus();document.querySelector("#products").scrollIntoView({behavior:"smooth"});});
document.querySelector("#open-cart").addEventListener("click",openCart);
document.querySelector("#close-cart").addEventListener("click",closeCart);
document.querySelector("#overlay").addEventListener("click",closeCart);
document.querySelector("#checkout").addEventListener("click",()=>{if(!cart.length){notice("Keranjang kosong","Tambahkan produk demo terlebih dahulu.");return;}notice("Checkout simulasi","Berhasil mencapai tahap checkout demo. Tidak ada pesanan, pembayaran, atau data pribadi yang dikirim.");});
document.querySelector("#close-notice").addEventListener("click",()=>document.querySelector("#notice-dialog").close());
document.querySelector("#notice-ok").addEventListener("click",()=>document.querySelector("#notice-dialog").close());
renderProducts();renderCart();
