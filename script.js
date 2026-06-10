const photos = window.SITE_PHOTOS;

function createPhoto(src, className='photo-card') {
  const card = document.createElement('button');
  card.className = className;
  card.type = 'button';
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'photo';
  img.loading = 'lazy';
  card.appendChild(img);
  card.addEventListener('click', () => openLightbox(src));
  return card;
}

const coupleGrid = document.getElementById('coupleGrid');
photos.couple.forEach(src => coupleGrid.appendChild(createPhoto(src)));

const birthdayGrid = document.getElementById('birthdayGrid');
photos.lastBirthday.forEach(src => birthdayGrid.appendChild(createPhoto(src)));

function createBouquetSticker(src, i) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'album-sticker';
  card.style.setProperty('--rot', `${[-2.5,1.5,-1,2.2][i % 4]}deg`);
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'bouquet';
  img.loading = 'lazy';
  const pin = document.createElement('span');
  pin.className = 'tiny-pin';
  pin.textContent = '♡';
  card.append(img, pin);
  card.addEventListener('click', () => openLightbox(src));
  return card;
}

const flowerBook = document.getElementById('flowerBook');
const flowerPageLeft = document.getElementById('flowerPageLeft');
const flowerPageRight = document.getElementById('flowerPageRight');
const prevFlower = document.getElementById('prevFlower');
const nextFlower = document.getElementById('nextFlower');
const flowerCounter = document.getElementById('flowerCounter');
let flowerPage = 0;
const flowersPerSpread = 4;
const totalFlowerPages = Math.ceil(photos.flowers.length / flowersPerSpread);

function renderFlowerAlbum(direction = 'next') {
  flowerBook.classList.remove('turn-next', 'turn-prev');
  void flowerBook.offsetWidth;
  flowerBook.classList.add(direction === 'next' ? 'turn-next' : 'turn-prev');

  const start = flowerPage * flowersPerSpread;
  const current = photos.flowers.slice(start, start + flowersPerSpread);
  const left = current.slice(0, 2);
  const right = current.slice(2, 4);
  flowerPageLeft.innerHTML = '';
  flowerPageRight.innerHTML = '';
  left.forEach((src, i) => flowerPageLeft.appendChild(createBouquetSticker(src, i)));
  right.forEach((src, i) => flowerPageRight.appendChild(createBouquetSticker(src, i + 2)));
  flowerCounter.textContent = `сторінка ${flowerPage + 1} з ${totalFlowerPages}`;
  prevFlower.disabled = flowerPage === 0;
  nextFlower.disabled = flowerPage === totalFlowerPages - 1;
}

prevFlower.addEventListener('click', () => {
  if (flowerPage > 0) {
    flowerPage -= 1;
    renderFlowerAlbum('prev');
  }
});
nextFlower.addEventListener('click', () => {
  if (flowerPage < totalFlowerPages - 1) {
    flowerPage += 1;
    renderFlowerAlbum('next');
  }
});
renderFlowerAlbum();

const envelopeBtn = document.getElementById('envelopeBtn');
const letterPaper = document.getElementById('letterPaper');
const closeLetter = document.getElementById('closeLetter');
envelopeBtn.addEventListener('click', () => {
  envelopeBtn.classList.add('open');
  setTimeout(() => letterPaper.classList.add('show'), 520);
});
closeLetter.addEventListener('click', () => {
  letterPaper.classList.remove('show');
  envelopeBtn.classList.remove('open');
});

const reasons = [
  'ти робиш навіть звичайні дні теплішими.',
  'з тобою будь-який момент стає особливим.',
  'ти вмієш дарувати турботу в найменших деталях.',
  'поруч із тобою дуже спокійно і дуже щасливо.',
  'ти мій улюблений спогад і мій улюблений сьогоднішній день.'
];
let reasonIndex = 0;
document.getElementById('reasonBtn').addEventListener('click', () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  document.getElementById('reasonText').textContent = reasons[reasonIndex];
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(src){
  lightboxImg.src = src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
}
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
function closeLightbox(){
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
}
window.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Щоб замінити текст у листі вручну:
// відкрий index.html і заміни текст всередині блоку <div class="letter-text"> ... </div>.
