'use strict';
(() => {
  const p = window.ACADEMIC_PROFILE || {};
  const dict = {
    zh: {skip:'跳转到正文',navAbout:'关于',navResearch:'研究',navPublications:'学术成果',navContact:'联系',navExperience:'经历',menu:'菜单',tagline:'以好奇心为起点，\n让思考持续生长。',explore:'探索我的研究',cv:'个人简历',figureCaption:'每个问题，都通向新的可能。',aboutTitle:'关于我',aboutLead:'保持好奇，认真思考。',researchTitle:'研究兴趣',researchEmptyTitle:'从问题出发，向未知探索。',researchEmpty:'研究方向与正在探索的课题将在这里更新。',publicationsTitle:'学术成果',publicationsEmptyTitle:'让想法留下痕迹。',publicationsEmpty:'论文、预印本与其他学术成果将陆续收录于此。',experienceTitle:'学习与经历',experienceEmptyTitle:'每一段经历，都是积累。',experienceEmpty:'教育背景与学术经历即将更新。',contactTitle:'在交流中，遇见新的想法。',contactText:'你可以在 GitHub 找到我，了解我的公开项目与动态。',footer:'个人学术主页',backTop:'回到顶部',allYears:'所有年份',search:'搜索标题、作者或关键词',yearLabel:'按年份筛选',noResults:'没有匹配的成果，请尝试其他关键词或年份。',paper:'论文',code:'代码',project:'项目',citation:'引用 / BibTeX',email:'邮箱',pageTitle:'学术主页'},
    en: {skip:'Skip to content',navAbout:'About',navResearch:'Research',navPublications:'Publications',navContact:'Contact',navExperience:'Background',menu:'Menu',tagline:'Led by curiosity.\nBuilt on thoughtful inquiry.',explore:'Explore my research',cv:'Curriculum vitae',figureCaption:'Every question opens a new possibility.',aboutTitle:'About me',aboutLead:'Stay curious. Think deeply.',researchTitle:'Research interests',researchEmptyTitle:'Begin with a question. Explore the unknown.',researchEmpty:'Research interests and current topics will be shared here.',publicationsTitle:'Publications',publicationsEmptyTitle:'A place for ideas to take shape.',publicationsEmpty:'Papers, preprints, and other scholarly work will be collected here.',experienceTitle:'Background',experienceEmptyTitle:'Every experience adds a new perspective.',experienceEmpty:'Education and academic experience will be added soon.',contactTitle:'Good ideas start with a conversation.',contactText:'Find me on GitHub to explore my public projects and activity.',footer:'Academic homepage',backTop:'Back to top',allYears:'All years',search:'Search titles, authors, or keywords',yearLabel:'Filter by year',noResults:'No matching publications. Try another keyword or year.',paper:'Paper',code:'Code',project:'Project',citation:'Cite / BibTeX',email:'Email',pageTitle:'Academic Homepage'}
  };
  const $ = id => document.getElementById(id);
  let lang = 'zh';
  try { if (localStorage.getItem('academic-language') === 'en') lang = 'en'; } catch (_) {}
  const tr = value => typeof value === 'string' ? value : value?.[lang] || value?.en || value?.zh || '';
  const element = (tag, text, className) => { const el = document.createElement(tag); if(text !== undefined) el.textContent = text; if(className) el.className = className; return el; };
  const safeUrl = value => { if (!value || typeof value !== 'string') return ''; try { const u = new URL(value, location.href); return ['https:','http:'].includes(u.protocol) || (location.protocol === 'file:' && u.protocol === 'file:') ? u.href : ''; } catch (_) { return ''; } };
  const link = (label, url) => { const a = element('a', label); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; };
  const empty = (title, copy) => { const block = element('div',undefined,'empty-state'); block.append(element('h3',title), element('p',copy)); return block; };
  const publications = Array.isArray(p.publications) ? p.publications : [];
  function renderPublications() {
    const d = dict[lang], list = $('publication-list'); list.replaceChildren();
    if (!publications.length) { list.append(empty(d.publicationsEmptyTitle,d.publicationsEmpty)); return; }
    const query = $('publication-search').value.trim().toLocaleLowerCase(); const year = $('publication-year').value;
    const filtered = publications.filter(item => (!year || String(item.year) === year) && [tr(item.title),tr(item.authors),tr(item.venue),(item.keywords || []).map(tr).join(' ')].join(' ').toLocaleLowerCase().includes(query)).slice().sort((a,b) => Number(b.year)-Number(a.year));
    if (!filtered.length) { list.append(element('p',d.noResults,'no-results')); return; }
    for (const item of filtered) {
      const article = element('article',undefined,'publication');
      article.append(element('div',[item.year,tr(item.venue)].filter(Boolean).join(' · '),'pub-meta'),element('h3',tr(item.title)),element('p',tr(item.authors),'authors'));
      const links = element('div',undefined,'pub-links');
      for (const key of ['paper','code','project']) { const url = safeUrl(item[key]); if(url) links.append(link(d[key]+' ↗',url)); }
      if(item.bibtex) { const details = element('details'); details.append(element('summary',d.citation),element('pre',item.bibtex)); links.append(details); }
      article.append(links); list.append(article);
    }
  }
  function render() {
    const d = dict[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = `${tr(p.name) || 'shangyulou'} · ${d.pageTitle}`;
    document.querySelector('meta[name="description"]').content = tr(p.introduction);
    document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = d[el.dataset.i18n] || ''; });
    document.querySelector('.tagline').style.whiteSpace = 'pre-line';
    document.querySelectorAll('[data-name]').forEach(el => el.textContent = tr(p.name) || 'shangyulou');
    document.querySelectorAll('[data-initials]').forEach(el => el.textContent = p.initials || 'SL');
    document.querySelector('.brand').setAttribute('aria-label',`${tr(p.name)} — ${d.backTop}`);
    $('navigation').setAttribute('aria-label',lang === 'zh' ? '主导航' : 'Main navigation');
    document.querySelector('.index-bar').setAttribute('aria-label',lang === 'zh' ? '页面索引' : 'Page index');
    document.querySelector('.figure svg').setAttribute('aria-label',lang === 'zh' ? '相互交织的轨道，象征探索与连接' : 'Interwoven orbits representing exploration and connection');
    $('introduction').textContent = tr(p.introduction); $('about-text').textContent = tr(p.about);
    const meta = [tr(p.role),tr(p.affiliation)].filter(Boolean).join(' · '); $('hero-meta').textContent = meta; $('hero-meta').hidden = !meta;
    $('language-toggle').textContent = lang === 'zh' ? 'EN ↗' : '中文 ↗'; $('language-toggle').setAttribute('aria-label',lang === 'zh' ? 'Switch to English' : '切换为中文');
    const cv = safeUrl(p.cv); $('cv-link').hidden = !cv; if(cv) $('cv-link').href = cv;
    const github = safeUrl(p.github);
    document.querySelectorAll('.github-link').forEach(a => { a.hidden = !github; if(github) a.href = github; });
    const social = $('academic-links'); social.replaceChildren();
    for(const [key,label] of [['github','GitHub'],['scholar','Google Scholar'],['orcid','ORCID']]) { const url = safeUrl(p[key]); if(url) social.append(link(label+' ↗',url)); }
    const research = $('research-content'); research.replaceChildren();
    if(!p.research?.length) research.append(empty(d.researchEmptyTitle,d.researchEmpty));
    else { const grid = element('div',undefined,'research-grid'); p.research.forEach((item,i) => { const card = element('article',undefined,'research-item'); card.append(element('span',String(i+1).padStart(2,'0'),'research-number'),element('h3',tr(item.title)),element('p',tr(item.description))); grid.append(card); }); research.append(grid); }
    const experience = $('experience-content'); experience.replaceChildren();
    if(!p.experience?.length) experience.append(empty(d.experienceEmptyTitle,d.experienceEmpty));
    else p.experience.forEach(item => { const row = element('article',undefined,'experience-item'), body = element('div'); body.append(element('h3',tr(item.title)),element('p',tr(item.institution)),element('p',tr(item.description))); row.append(element('time',tr(item.period)),body); experience.append(row); });
    $('publication-tools').hidden = !publications.length;
    $('publication-search').placeholder = d.search; $('publication-search').setAttribute('aria-label',d.search);
    const selectedYear = $('publication-year').value; $('publication-year').replaceChildren(); $('publication-year').setAttribute('aria-label',d.yearLabel);
    const all = element('option',d.allYears); all.value = ''; $('publication-year').append(all);
    [...new Set(publications.map(item => String(item.year)).filter(year => /^\d{4}$/.test(year)))].sort().reverse().forEach(year => { const option = element('option',year); option.value = year; $('publication-year').append(option); });
    $('publication-year').value = selectedYear; renderPublications();
    const contact = $('contact-links'); contact.replaceChildren();
    if(github) contact.append(link('GitHub / '+new URL(github).pathname.replace(/^\//,'').replace(/\/$/,'')+' ↗',github));
    if(p.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) { const a = element('a',p.email+' ↗'); a.href = 'mailto:'+encodeURIComponent(p.email); contact.prepend(a); }
    $('year').textContent = new Date().getFullYear();
  }
  $('language-toggle').addEventListener('click',() => { lang = lang === 'zh' ? 'en' : 'zh'; try { localStorage.setItem('academic-language',lang); } catch (_) {} render(); });
  const closeMenu = () => { $('navigation').classList.remove('open'); $('menu-toggle').setAttribute('aria-expanded','false'); };
  $('menu-toggle').addEventListener('click',() => { const open = $('navigation').classList.toggle('open'); $('menu-toggle').setAttribute('aria-expanded',String(open)); });
  $('navigation').querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event => { if(event.key === 'Escape' && $('navigation').classList.contains('open')) { closeMenu(); $('menu-toggle').focus(); } });
  $('publication-search').addEventListener('input',renderPublications); $('publication-year').addEventListener('change',renderPublications);
  if('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) { $('navigation').querySelectorAll('a').forEach(a => { if(a.hash === '#'+entry.target.id) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); } },{rootMargin:'-15% 0px -50% 0px',threshold:0}); document.querySelectorAll('main section[id]').forEach(section => observer.observe(section)); }
  render();
})();
