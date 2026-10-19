// =========================================
// PART 3 - FUNCTIONALITY & JAVASCRIPT - WEDE5020 POE
// Student: Aphelele Mahaye - FINAL FIXED VERSION 2026
// Implements: Accordions, Tabs, Modals, Maps, Animations, DOM, Lightbox, Dynamic Content, Search, Games History
// =========================================

// 2.1 Interactive Elements - Accordions (jQuery)
$(document).ready(function(){
  $('.accordion-header').click(function(){
    var item = $(this).parent();
    var content = item.find('.accordion-content');
    var isActive = item.hasClass('active');
    $('.accordion-item').removeClass('active');
    $('.accordion-content').css('max-height','0').css('padding','0 22px');
    if(!isActive){
      item.addClass('active');
      content.css('max-height', (content[0].scrollHeight + 40) + 'px').css('padding','18px 22px');
    }
  });
});

// --- Tabs ---
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var target = this.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
      document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
      this.classList.add('active');
      var panel = document.getElementById(target);
      if(panel) panel.classList.add('active');
      if(panel){
        panel.querySelectorAll('.stagger-item').forEach(function(el, i){
          el.classList.remove('show');
          setTimeout(function(){ el.classList.add('show'); }, i*100);
        });
      }
    });
  });
}

// --- Modals ---
function openModal(id){
  var modal = document.getElementById(id);
  if(modal){ modal.classList.add('open'); document.body.style.overflow='hidden'; }
}
function closeModal(id){
  var modal = document.getElementById(id);
  if(modal){ modal.classList.remove('open'); document.body.style.overflow=''; }
}
document.addEventListener('click', function(e){
  if(e.target.classList.contains('modal-overlay') || e.target.classList.contains('lightbox-overlay')){
    e.target.classList.remove('open');
    document.body.style.overflow='';
  }
});

// --- Interactive Map using Leaflet - FIXED TYPOS ---
function initMap(){
  var mapEl = document.getElementById('map');
  if(!mapEl || typeof L === 'undefined') return;
  var map = L.map('map').setView([-29.8587, 31.0218], 6);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '(c) OpenStreetMap (c) CARTO - Dark Mode'
  }).addTo(map);
  var locations = [
    { lat: -29.8587, lng: 31.0218, title: "Your Location - Durban, KZN", desc: "Home of Aphelele Mahaye - 4091", color: "#00E5FF" },
    { lat: -29.8579, lng: 31.0292, title: "Rockstar Fan Hub - Durban", desc: "Local gaming community hub", color: "#FFB700" },
    { lat: 40.7128, lng: -74.0060, title: "Rockstar Games HQ - New York", desc: "Broadway, NY 10001", color: "#FF6A00" }
  ];
  locations.forEach(function(loc){
    var customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="width:14px; height:14px; background:' + loc.color + '; border-radius:50%; border:2px solid #000; box-shadow:0 0 10px ' + loc.color + ';"></div>',
      iconSize: [14,14]
    });
    L.marker([loc.lat, loc.lng], {icon:customIcon}).addTo(map)
    .bindPopup('<b>' + loc.title + '</b><br>' + loc.desc);
  });
  var latlngs = [[-29.8587, 31.0218], [40.7128, -74.0060]];
  L.polyline(latlngs, {color: '#FFB700', weight: 1, opacity: 0.3, dashArray: '5, 10'}).addTo(map);
}

// --- Animations - Scroll Reveal ---
function initScrollReveal(){
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('active'); }
    });
  }, { threshold:0.15 });
  reveals.forEach(function(el){ observer.observe(el); });
  var staggerItems = document.querySelectorAll('.stagger-item');
  staggerItems.forEach(function(el, i){
    setTimeout(function(){ el.classList.add('show'); }, i*80);
  });
}

// --- Lightbox - FIXED to set src ---
function initLightbox(){
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCaption = document.getElementById('lightboxCaption');
  if(!lightbox || !lightboxImg) return;
  document.querySelectorAll('.lightbox-trigger').forEach(function(img){
    img.addEventListener('click', function(){
      lightboxImg.src = this.src;
      lightboxCaption.textContent = this.alt || this.getAttribute('data-caption') || 'Rockstar Games';
      lightbox.classList.add('open');
      document.body.style.overflow='hidden';
    });
  });
}

// --- Dynamic Content - FIXED - YOUR REAL IMAGES ---
var productsData = [
  { id:1, name:"GTA V Premium Edition", price:"R 499", category:"games", badge:"BESTSELLER", img:"images/grand-theft-auto-v-los-santos-gameplay-800x600.jpg", alt:"Grand Theft Auto V Los Santos gameplay three protagonists Franklin Michael Trevor open world 2013 Rockstar Games Durban KZN 4091 WEDE5020 BESTSELLER", history:"2013 - Los Santos & Blaine County. Franklin, Michael, Trevor. 200M+ copies. RAGE Engine.", officialUrl:"https://www.rockstargames.com/gta-v" },
  { id:2, name:"Red Dead Redemption 2", price:"R 599", category:"games", badge:"NEW ERA", img:"images/red-dead-redemption-2-arthur-morgan-american-frontier-800x600.jpg", alt:"Red Dead Redemption 2 unforgettable journey American frontier 1899 Arthur Morgan Van der Linde gang honor loyalty survival wild west Rockstar Games NEW ERA", history:"2018 - Van der Linde gang final days. Arthur Morgan story. 8 years development.", officialUrl:"https://www.rockstargames.com/reddeadredemption2" },
  { id:3, name:"Max Payne Remake", price:"R 799", category:"games", badge:"COMING SOON", img:"images/max-payne-remake-rockstar-presents-ps5-xbox-800x600.jpg", alt:"Max Payne Remake Rockstar Games presents jaw-dropping action packed dynasty bullet-time noir PS5 Xbox Series PC COMING SOON", history:"2001 - NYPD detective Max Payne, noir comic, bullet-time revolution. Remake 2025.", officialUrl:"https://www.rockstargames.com/games/maxpayne" },
  { id:4, name:"GTA VI Tee - Vice City", price:"R 349", category:"apparel", badge:"PRE-ORDER", img:"images/grand-theft-auto-v-los-santos-gameplay-800x600.jpg", alt:"GTA VI Vice City tee apparel Rockstar Games fan project Durban KZN 4091 PRE-ORDER", history:"Vice City returns 2026 - Biggest world yet.", officialUrl:"https://www.rockstargames.com/VI" },
  { id:5, name:"Los Santos Cap - Neon Edition", price:"R 299", category:"gear", badge:"GEAR", img:"images/grand-theft-auto-v-los-santos-gameplay-800x600.jpg", alt:"Los Santos cap neon edition gear Rockstar Games fan merchandise Durban KZN 4091", history:"Official Rockstar gear - Los Santos cap.", officialUrl:"https://www.rockstargames.com" },
  { id:6, name:"Red Dead Hoodie - Van der Linde", price:"R 649", category:"apparel", badge:"HOT", img:"images/red-dead-redemption-2-arthur-morgan-american-frontier-800x600.jpg", alt:"Red Dead hoodie Van der Linde gang Arthur Morgan apparel Rockstar Games Durban KZN", history:"Van der Linde gang hoodie - 1899 frontier.", officialUrl:"https://www.rockstargames.com/reddeadredemption2" },
  { id:7, name:"Neon Vice City Poster Set", price:"R 199", category:"gear", badge:"LIMITED", img:"images/max-payne-remake-rockstar-presents-ps5-xbox-800x600.jpg", alt:"Neon Vice City poster set limited edition Rockstar Games artwork Durban KZN gallery", history:"Limited edition posters - Vice City neon.", officialUrl:"https://www.rockstargames.com" },
  { id:8, name:"GTA Trilogy Remastered", price:"R 799", category:"games", badge:"CLASSIC", img:"images/grand-theft-auto-v-los-santos-gameplay-800x600.jpg", alt:"GTA Trilogy remastered classic collection Rockstar Games III Vice City San Andreas fan project", history:"GTA III, Vice City, San Andreas remastered.", officialUrl:"https://www.rockstargames.com/GTATrilogy" }
];

// Games History Data for Index.html - Dynamic Content with Official Links
var gamesHistoryData = [
  { id:1, title:"GRAND THEFT AUTO V", badge:"BESTSELLER", badgeClass:"", shortDesc:"Three protagonists, one city. Released 2013.", img:"images/grand-theft-auto-v-los-santos-gameplay-800x600.jpg", alt:"Grand Theft Auto V Los Santos gameplay three protagonists Franklin Michael Trevor city view open world 2013 Rockstar Games fan project Durban KZN 4091 WEDE5020 BESTSELLER", history:"2013 - Los Santos & Blaine County. Franklin, Michael, Trevor. Biggest open world at launch, 200M+ copies. RAGE Engine, satire of American culture. Originally GTA: 1997 top-down.", officialUrl:"https://www.rockstargames.com/gta-v" },
  { id:2, title:"RED DEAD REDEMPTION 2", badge:"NEW ERA", badgeClass:"new", shortDesc:"America 1899 - Arthur Morgan's journey.", img:"images/red-dead-redemption-2-arthur-morgan-american-frontier-800x600.jpg", alt:"Red Dead Redemption 2 unforgettable journey American frontier 1899 Arthur Morgan Van der Linde gang honor loyalty survival wild west Rockstar Games NEW ERA", history:"2018 - Van der Linde gang final days. Arthur Morgan, John Marston prequel. 8 years development, most immersive world. Started as Red Dead Revolver 2004.", officialUrl:"https://www.rockstargames.com/reddeadredemption2" },
  { id:3, title:"MAX PAYNE REMAKE", badge:"COMING SOON", badgeClass:"hot", shortDesc:"Noir bullet-time returns 2025.", img:"images/max-payne-remake-rockstar-presents-ps5-xbox-800x600.jpg", alt:"Max Payne Remake Rockstar Games presents jaw-dropping action packed dynasty bullet-time noir PS5 Xbox Series PC COMING SOON", history:"2001 - NYPD detective Max Payne, noir comic panels, bullet-time revolution. Remedy + Rockstar. Remake by Remedy in Northlight Engine, Rockstar publishing 2025.", officialUrl:"https://www.rockstargames.com/games/maxpayne" }
];

function loadProducts(containerId, filter, searchTerm){
  var container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = '<div class="loader"><div class="loader-dots"><span></span><span></span><span></span></div><p>Loading products...</p></div>';
  setTimeout(function(){
    var filtered = productsData.filter(function(p){
      var matchFilter = (filter === 'all' || p.category === filter);
      var matchSearch = true;
      if(searchTerm){ matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()); }
      return matchFilter && matchSearch;
    });
    if(filtered.length === 0){
      container.innerHTML = '<div class="no-results show"><h3>No products found</h3><p>Try: GTA, Red, Tee, Jacket, Cap</p></div>';
      return;
    }
    var html = '<div class="game-container">';
    filtered.forEach(function(p){
      html += '<div class="game-card stagger-item" data-category="'+p.category+'">' +
      '<div style="position:relative; overflow:hidden;"><span class="badge" style="position:absolute; top:12px; left:12px; z-index:2;">'+p.badge+'</span>' +
      '<img src="'+p.img+'" alt="'+p.alt+'" class="lightbox-trigger" style="width:100%; height:220px; object-fit:cover; cursor:pointer;"></div>' +
      '<div class="game-info"><h3>'+p.name.toUpperCase()+'</h3><p style="color:#FFB700; font-weight:700;">'+p.price+'</p>' +
      '<p style="font-size:11px; color:#888; margin:8px 0;">'+p.history+'</p>' +
      '<div style="display:flex; gap:8px; margin-top:12px;"><button class="btn btn-primary add-btn" style="flex:1;">Add to Cart</button><a href="'+p.officialUrl+'" target="_blank" class="btn btn-ghost" style="flex:1; text-align:center;">Official →</a></div></div></div>';
    });
    html += '</div>';
    container.innerHTML = html;
    setTimeout(function(){
      container.querySelectorAll('.stagger-item').forEach(function(el, idx){
        setTimeout(function(){ el.classList.add('show'); }, idx*60);
      });
      initLightbox();
      initAddToCart();
    }, 50);
  }, 400);
}

function loadGamesHistory(containerId){
  var container = document.getElementById(containerId);
  if(!container) return;
  container.innerHTML = "";
  gamesHistoryData.forEach(function(game, index){
    var card = document.createElement("div");
    card.className = "card stagger-item";
    card.innerHTML = `
      <div class="card-img">
        <span class="badge ${game.badgeClass}">${game.badge}</span>
        <img src="${game.img}" alt="${game.alt}" class="lightbox-trigger">
      </div>
      <div class="card-body">
        <h4>${game.title}</h4>
        <p>${game.shortDesc}</p>
        <a class="card-link" onclick="openModal('gameModal'); document.getElementById('modalTitle').textContent='${game.title} - History'; document.getElementById('modalDesc').innerHTML='${game.history} <br><br><a href=${game.officialUrl} target=_blank style=color:#FFB700>View Official Rockstar Page →</a>'; document.getElementById('modalOfficialLink').href='${game.officialUrl}';">Learn More →</a>
      </div>
    `;
    container.appendChild(card);
    setTimeout(function(){ card.classList.add('show'); }, index*100);
  });
  initLightbox();
}

// --- Search - FIXED TYPOS ---
function initSearch(){
  var searchInput = document.getElementById('searchInput');
  var gameSearch = document.getElementById('gameSearch');
  if(searchInput){
    searchInput.addEventListener('input', function(){
      var term = this.value;
      var activeFilter = document.querySelector('.filter-tag.active') ? document.querySelector('.filter-tag.active').getAttribute('data-filter') : 'all';
      loadProducts('productsContainer', activeFilter, term);
    });
  }
  if(gameSearch){
    gameSearch.addEventListener('input', function(){
      var term = this.value.toLowerCase();
      var cards = document.querySelectorAll('.game-card, .card');
      var visible = 0;
      cards.forEach(function(card){
        var text = card.textContent.toLowerCase();
        if(text.includes(term)){ card.style.display=''; visible++; } else { card.style.display='none'; }
      });
      var noRes = document.getElementById('noGamesResults');
      if(noRes){ if(visible===0) noRes.classList.add('show'); else noRes.classList.remove('show'); }
    });
  }
}

function initFilters(){
  document.querySelectorAll('.filter-tag').forEach(function(tag){
    tag.addEventListener('click', function(){
      document.querySelectorAll('.filter-tag').forEach(function(t){ t.classList.remove('active'); });
      this.classList.add('active');
      var filter = this.getAttribute('data-filter');
      var searchTerm = document.getElementById('searchInput') ? document.getElementById('searchInput').value : '';
      if(document.getElementById('productsContainer')){ loadProducts('productsContainer', filter, searchTerm); }
    });
  });
}

function initAddToCart(){
  var cart = JSON.parse(localStorage.getItem('rockstarCart') || '[]');
  updateCartBadge(cart.length);
  document.querySelectorAll('.add-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var card = this.closest('.game-card');
      var name = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Product';
      cart.push({name:name, price:"R 499"});
      localStorage.setItem('rockstarCart', JSON.stringify(cart));
      updateCartBadge(cart.length);
      var toast = document.getElementById('toast');
      if(toast){ toast.textContent = name + ' Added to Cart ✓'; toast.classList.add('show'); setTimeout(function(){ toast.classList.remove('show'); }, 3000); }
    });
  });
}
function updateCartBadge(count){
  var badge = document.getElementById('cartCount');
  if(badge){ badge.textContent = count; badge.style.display = count>0 ? 'inline-block' : 'none'; }
}

// Forms etc (kept from your original)
function initNavAndContact(){
  var navToggle = document.getElementById('nav-toggle');
  var navLinks = document.getElementById('navLinks');
  if(navToggle && navLinks){
    document.querySelector('.hamburger').addEventListener('click', function(){
      navLinks.classList.toggle('open');
    });
  }
}
function showError(id, msg){
  var el = document.getElementById(id);
  if(el){ el.style.borderColor = '#FF0040'; var err = document.getElementById(id+'Error'); if(err){ err.textContent = msg; err.style.display='block'; } }
}
function clearError(id){
  var el = document.getElementById(id);
  if(el){ el.style.borderColor = ''; var err = document.getElementById(id+'Error'); if(err){ err.style.display='none'; } }
}
function initContactForm(){
  var form = document.getElementById('contactForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var isValid = true;
    ['contactName','contactEmail','contactPhone','messageType','contactMessage'].forEach(clearError);
    var name = document.getElementById('contactName').value.trim();
    if(name.length < 2){ showError('contactName','Name min 2 characters'); isValid=false; }
    var email = document.getElementById('contactEmail').value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){ showError('contactEmail','Invalid email'); isValid=false; }
    var phone = document.getElementById('contactPhone').value.trim();
    if(phone){ var phonePattern = /^(\+27|0)[0-9]{9}$/; if(!phonePattern.test(phone.replace(/\s/g,''))){ showError('contactPhone','Invalid SA phone format'); isValid=false; } }
    var msgType = document.getElementById('messageType').value;
    if(!msgType){ showError('messageType','Select message type'); isValid=false; }
    var message = document.getElementById('contactMessage').value.trim();
    if(message.length < 10){ showError('contactMessage','Message min 10 characters'); isValid=false; }
    if(!isValid){ var summary = document.getElementById('contactErrorSummary'); if(summary){ summary.textContent='⚠️ Please correct errors'; summary.style.display='block'; } return; }
    var recipient = 'support@rockstargames.com';
    var emailBody = 'CONTACT FORM SUBMISSION\nName: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || 'Not provided') + '\nType: ' + msgType + '\nMessage:\n' + message;
    var submitBtn = document.getElementById('contactSubmitBtn');
    var origText = submitBtn.textContent;
    submitBtn.textContent = 'SENDING...'; submitBtn.disabled = true;
    setTimeout(function(){
      var resultDiv = document.getElementById('contactResult');
      resultDiv.innerHTML = '<div style="background:#12121A; border:1px solid #39FF14; border-radius:12px; padding:24px;"><h3 style="color:#39FF14;">MESSAGE SENT ✓</h3><p style="color:#AAA; font-size:12px; white-space:pre-line; background:#1A1A26; padding:16px; border-radius:8px;">' + emailBody + '</p><p style="color:#FFB700;">Recipient: ' + recipient + '</p></div>';
      form.reset(); submitBtn.textContent = origText; submitBtn.disabled = false; resultDiv.scrollIntoView({behavior:'smooth'});
    }, 1000);
  });
}
function initEnquiryForm(){
  var form = document.getElementById('enquiryForm');
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var email = document.getElementById('enqEmail') ? document.getElementById('enqEmail').value : '';
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(email)){ showError('enqEmail','Invalid email format'); return; }
    fetch(form.action, { method:'POST', body:new FormData(form) }).then(function(){
      var res = document.getElementById('enquiryResult'); if(res) res.innerHTML = 'Cost: R 499 | Availability: In Stock';
    }).catch(function(){
      var res = document.getElementById('enquiryResult'); if(res) res.innerHTML = 'Cost: R 499 | Availability: In Stock (offline demo)';
    });
  });
}

// Initialize all on load
document.addEventListener('DOMContentLoaded', function(){
  initTabs();
  initScrollReveal();
  initLightbox();
  initSearch();
  initFilters();
  initAddToCart();
  initMap();
  initNavAndContact();
  initContactForm();
  initEnquiryForm();
  if(document.getElementById('productsContainer')){ loadProducts('productsContainer', 'all', ''); }
  if(document.getElementById('gamesHistoryContainer')){ loadGamesHistory('gamesHistoryContainer'); }
  if(document.getElementById('indexGamesContainer')){ loadGamesHistory('indexGamesContainer'); }
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){
      document.querySelectorAll('.modal-overlay.open, .lightbox-overlay.open').forEach(function(el){ el.classList.remove('open'); });
      document.body.style.overflow='';
    }
  });
});
