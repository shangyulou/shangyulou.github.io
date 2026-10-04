/* English-only academic homepage. No dependencies or tracking. */
'use strict';
(() => {
  const profile = window.ACADEMIC_PROFILE || {};
  const $ = id => document.getElementById(id);
  const text = value => typeof value === 'string' ? value : value?.en || '';
  const element = (tag, content, className) => { const el = document.createElement(tag); if(content !== undefined) el.textContent = content; if(className) el.className = className; return el; };
  const safeUrl = value => { if(!value || typeof value !== 'string') return ''; try { const u = new URL(value,location.href); return ['https:','http:'].includes(u.protocol) || (location.protocol === 'file:' && u.protocol === 'file:') ? u.href : ''; } catch (_) { return ''; } };
  const link = (label,url) => { const a = element('a',label); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };
  const fullName = [profile.firstName,profile.lastName].filter(Boolean).join(' ') || 'shangyulou';
  document.querySelectorAll('[data-first-name]').forEach(el => el.textContent = profile.firstName || 'shangyulou');
  document.querySelectorAll('[data-last-name]').forEach(el => el.textContent = profile.lastName || '');
  document.querySelectorAll('[data-full-name]').forEach(el => el.textContent = fullName);
  $('year').textContent = new Date().getFullYear(); $('updated').textContent = profile.updated || 'October 4, 2026';
  document.querySelector('meta[name="description"]').content = `${fullName}'s academic homepage. Research interests, selected publications, and writing.`;
  document.querySelector('meta[property="og:title"]').content = `${fullName} | Academic Homepage`;
  const affiliation = [text(profile.role),text(profile.affiliation)].filter(Boolean).join(' · '); $('affiliation').textContent = affiliation; $('affiliation').hidden = !affiliation;
  const github = safeUrl(profile.github);
  const scholar = safeUrl(profile.scholar);
  if(profile.biography?.length) {
    $('biography').replaceChildren();
    profile.biography.forEach(paragraph => {
      if(Array.isArray(paragraph.parts)) {
        const p = element('p');
        paragraph.parts.forEach(part => {
          if(typeof part === 'string') p.append(document.createTextNode(part));
          else { const url = safeUrl(part.url); if(url) p.append(link(text(part.text),url)); else p.append(document.createTextNode(text(part.text))); }
        });
        $('biography').append(p); return;
      }
      const p = element('p'); const content = text(paragraph);
      if(github && content.includes('GitHub')) { const parts = content.split('GitHub'); parts.forEach((part,i) => { if(i) p.append(link('GitHub',github)); p.append(document.createTextNode(part)); }); }
      else p.textContent = content;
      $('biography').append(p);
    });
  }
  const contact = $('get-in-touch'); contact.replaceChildren();
  const email = typeof profile.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email) ? profile.email : '';
  if(email) { contact.append(document.createTextNode('Feel free to get in touch at ')); const a = element('a',email); a.href = 'mailto:'+encodeURIComponent(email); contact.append(a,document.createTextNode('.')); }
  else if(scholar) contact.append(document.createTextNode('Find me on '),link('Google Scholar',scholar),document.createTextNode('.'));
  else if(github) contact.append(document.createTextNode('Find me on '),link('GitHub',github),document.createTextNode('.'));
  else contact.hidden = true;
  const photo = safeUrl(profile.photo);
  if(photo) { const img = element('img'); img.alt = profile.photoAlt || `Portrait of ${fullName}`; img.width = 289; img.height = 375; img.addEventListener('load',() => $('portrait').replaceChildren(img),{once:true}); img.src = photo; }
  const icons = {
    github:'M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 1.72 2.64 1.23 3.28.94.1-.73.39-1.23.72-1.51-2.5-.29-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .95-.31 3.1 1.15a10.8 10.8 0 0 1 5.63 0c2.15-1.46 3.09-1.15 3.09-1.15.61 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.34-2.64 5.28-5.15 5.56.4.35.76 1.04.76 2.1v3.09c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z',
    email:'M2 4h20v16H2V4Zm1.8 2 8.2 6 8.2-6H3.8Zm16.4 12V8.5L12 14.5 3.8 8.5V18h16.4Z',
    scholar:'m12 2 12 8-12 8L0 10l12-8Zm-7 11v5c4 4 10 4 14 0v-5l-7 4.7L5 13Z',
    orcid:'M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM6.5 5a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4ZM5.6 9h1.8v10H5.6V9Zm4.2 0h4.1c7 0 7 10 0 10H9.8V9Zm1.8 1.6v6.8h2.2c4.7 0 4.7-6.8 0-6.8h-2.2Z',
    twitter:'M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 14.6 5.5 22H2.3l8.2-9.4L.8 2h6.5l5.9 7.8L18.9 2ZM17.8 20h1.8L6.3 3.9H4.4L17.8 20Z'
  };
  const socials = $('social-links'); socials.replaceChildren();
  for(const [key,label] of [['email','Email'],['scholar','Google Scholar'],['github','GitHub'],['orcid','ORCID'],['twitter','X / Twitter']]) {
    const url = key === 'email' ? (email ? 'mailto:'+encodeURIComponent(email) : '') : safeUrl(profile[key]); if(!url) continue;
    const a = link('',url); a.setAttribute('aria-label',label+(key === 'email' ? '' : ' profile')); a.title = label;
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg'); svg.setAttribute('viewBox','0 0 24 24'); svg.setAttribute('aria-hidden','true'); const path = document.createElementNS('http://www.w3.org/2000/svg','path'); path.setAttribute('d',icons[key]); svg.append(path); a.append(svg);
    socials.append(a);
  }
  if(profile.research?.length) {
    const ul = element('ul'); profile.research.forEach(item => { const li = element('li'); if(typeof item === 'string') li.textContent = item; else { li.append(element('strong',text(item.title))); if(item.description) li.append(document.createTextNode(': '+text(item.description))); } ul.append(li); }); $('research-content').replaceChildren(ul);
  }
  const publications = Array.isArray(profile.publications) ? profile.publications : [];
  if(publications.length) {
    const list = $('publication-list'); list.replaceChildren();
    for(const item of publications) {
      const article = element('article',undefined,'selected-publication');
      const content = element('div',undefined,'publication-content');
      const title = element('h3'); const paper = safeUrl(item.paper);
      if(paper) title.append(link(text(item.title),paper)); else title.textContent = text(item.title);
      const authors = element('p',undefined,'authors');
      text(item.authors).split(fullName).forEach((part,i) => { if(i) authors.append(element('strong',fullName)); authors.append(document.createTextNode(part)); });
      content.append(title,authors,element('p',text(item.venue),'publication-venue'));
      const links = element('div',undefined,'paper-links');
      for(const [key,label] of [['paper','Paper'],['pdf','PDF']]) { const url = safeUrl(item[key]); if(url) links.append(link(label+' ↗',url)); }
      content.append(links); article.append(element('span',String(item.year),'publication-year'),content); list.append(article);
    }
  }
  if(profile.posts?.length) { $('blog-content').replaceChildren(); profile.posts.forEach(item => { const article = element('article',undefined,'post'), title = element('h2'), url = safeUrl(item.url); if(url) title.append(link(text(item.title),url)); else title.textContent = text(item.title); const time = element('time',text(item.date)); article.append(time,title,element('p',text(item.summary))); if(item.content) article.append(element('p',text(item.content))); $('blog-content').append(article); }); }
  const pageTitles = {about:'About',blog:'Blog'};
  function route(moveFocus) {
    const requested = location.hash.slice(1);
    if(requested === 'main') { $('main').focus({preventScroll:true}); return; }
    const page = Object.hasOwn(pageTitles,requested) ? requested : 'about';
    document.querySelectorAll('.page').forEach(section => section.hidden = section.id !== page);
    document.querySelectorAll('[data-page]').forEach(a => { if(a.dataset.page === page) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    document.title = `${fullName} | ${pageTitles[page]}`;
    if(requested === 'publications' || requested === 'selected-publications') { $('selected-publications').scrollIntoView({block:'start'}); }
    else if(moveFocus) { $('main').focus({preventScroll:true}); window.scrollTo({top:0,behavior:'instant'}); }
  }
  window.addEventListener('hashchange',() => route(true)); route(false);
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark', label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    $('theme-toggle').setAttribute('aria-label',label); $('theme-toggle').title = label; $('theme-toggle').setAttribute('aria-pressed',String(dark));
    document.querySelector('meta[name="theme-color"]').content = dark ? '#1c1c1d' : '#ffffff';
  }
  let theme = 'light'; try { if(localStorage.getItem('academic-theme') === 'dark') theme = 'dark'; } catch (_) {} setTheme(theme);
  $('theme-toggle').addEventListener('click',() => { const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; setTheme(next); try { localStorage.setItem('academic-theme',next); } catch (_) {} });
})();
