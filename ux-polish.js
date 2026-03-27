const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'site/public');

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(dir, file), 'utf8');

  // 1. Add scroll-smooth to html tag
  if (!content.includes('scroll-smooth')) {
    // If it already has a class attribute
    if (content.match(/<html[^>]*class="/i)) {
      content = content.replace(/(<html[^>]*class=")/i, '$1scroll-smooth ');
    } else {
      content = content.replace(/<html/i, '<html class="scroll-smooth"');
    }
  }

  // 2. Add loading="lazy" to images (skip first 2)
  let imgCount = 0;
  content = content.replace(/<img(.*?)>/gi, (match, g1) => {
    imgCount++;
    if (imgCount > 2 && !match.includes('loading=')) {
      return `<img loading="lazy"${g1}>`;
    }
    return match;
  });

  // 3. Inject mobile menu before </body>
const mobileMenuHTML = `
<!-- Mobile Navigation Overlay -->
<div id="mobile-nav-overlay" class="fixed inset-0 bg-[#000a1e]/98 backdrop-blur-xl z-[100] hidden flex-col justify-center items-center text-center transition-opacity duration-300 opacity-0">
  <button id="close-mobile-nav" class="absolute top-6 right-6 text-white p-3 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-white/10 rounded-full transition-colors" aria-label="Close menu">
    <span class="material-symbols-outlined text-4xl">close</span>
  </button>
  <div class="flex flex-col gap-6 p-4 w-full max-w-sm">
    <a href="index.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Home</a>
    <a href="courses.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Courses</a>
    <a href="about.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">About</a>
    <a href="results.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Results</a>
    <a href="gallery.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Gallery</a>
    <a href="blog.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Blog</a>
    <a href="faq.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">FAQ</a>
    <a href="contact.html" class="text-2xl font-headline font-bold text-white hover:text-[#f0e2ba] py-2">Contact</a>
    <div class="w-full h-px bg-white/20 my-4"></div>
    <button class="bg-[#f0e2ba] text-[#002147] px-8 py-4 rounded-xl font-bold w-full active:scale-95 transition-transform min-h-[44px]">Call Now</button>
  </div>
</div>

<!-- Mobile Hamburger Button -->
<button id="open-mobile-nav" class="md:hidden fixed top-4 right-6 z-[60] bg-[#000a1e]/80 backdrop-blur-md text-white p-2 rounded-lg shadow-lg border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-[#000a1e] transition-colors">
  <span class="material-symbols-outlined text-2xl">menu</span>
</button>

<script>
  document.getElementById('open-mobile-nav')?.addEventListener('click', () => {
    const overlay = document.getElementById('mobile-nav-overlay');
    if(overlay) {
      overlay.classList.remove('hidden');
      overlay.classList.add('flex');
      // small delay to allow display:flex to apply before opacity transition
      setTimeout(() => overlay.classList.remove('opacity-0'), 10);
      document.body.style.overflow = 'hidden'; // prevent background scrolling
    }
  });
  document.getElementById('close-mobile-nav')?.addEventListener('click', () => {
    const overlay = document.getElementById('mobile-nav-overlay');
    if(overlay) {
      overlay.classList.add('opacity-0');
      setTimeout(() => {
        overlay.classList.add('hidden');
        overlay.classList.remove('flex');
        document.body.style.overflow = '';
      }, 300);
    }
  });
</script>
`;
  if (!content.includes('mobile-nav-overlay')) {
    content = content.replace('</body>', mobileMenuHTML + '\n</body>');
  }

  // 4. Form Improvements on contact and other pages
  content = content.replace(/<input(.*?)placeholder="Full Name"(.*?)>/gi, (match) => {
    return match.includes('required') ? match : match.replace('>', ' autocomplete="name" required>');
  });
  content = content.replace(/<input(.*?)placeholder="(?:Email|Email Address)"(.*?)>/gi, (match) => {
    return match.includes('required') ? match : match.replace('>', ' autocomplete="email" required>');
  });
  content = content.replace(/<input(.*?)placeholder="Phone(?: Number)?"(.*?)>/gi, (match) => {
    return match.includes('required') ? match : match.replace('>', ' autocomplete="tel" required>');
  });

  fs.writeFileSync(path.join(dir, file), content, 'utf8');
});
console.log('Done polishing ' + files.length + ' files.');
