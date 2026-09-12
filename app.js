const demos = {
  form: {
    preview: `<p class="preview-kicker">REQUEST AN ESTIMATE</p><h3>Tell us about your project.</h3><label>What can we help with?</label><div class="fake-input">Choose a service <span>⌄</span></div><label>How should we reach you?</label><div class="fake-input">Name and email</div><button class="fake-button" type="button">Send request <span>→</span></button>`,
    title: "A clean lead lands in one organized place.",
    copy: "The visitor gets a clear confirmation. You get an email notification, and the full response is saved automatically in Google Sheets.",
    list: ["Up to 10 focused questions", "Required fields and confirmation", "Tested before launch"]
  },
  booking: {
    preview: `<p class="preview-kicker">BOOK A CONSULTATION</p><h3>Choose a time that works.</h3><div class="date-strip"><b>MON<em>14</em></b><b class="selected">TUE<em>15</em></b><b>WED<em>16</em></b></div><label>AVAILABLE TIMES</label><div class="time-grid"><span>9:30 AM</span><span>11:00 AM</span><span>2:30 PM</span><span>4:00 PM</span></div><button class="fake-button" type="button">Confirm time <span>→</span></button>`,
    title: "A confirmed appointment appears on your calendar.",
    copy: "Customers choose from your real availability. Confirmation is automatic, with options for phone, in-person, or Google Meet appointments.",
    list: ["One appointment type", "Hours, duration, and buffer setup", "Instructions for changing availability"]
  },
  reviews: {
    preview: `<p class="preview-kicker">WHAT CUSTOMERS SAY</p><h3>Trusted by people nearby.</h3><div class="review-card"><div class="stars">★★★★★</div><p>“Clear, professional, and incredibly easy to work with.”</p><small>Verified Google review</small></div><div class="review-score"><strong>4.9</strong><span>Google rating<br>Recent reviews update automatically</span></div>`,
    title: "Your reputation becomes part of the website experience.",
    copy: "Recent Google reviews can appear on your site, helping visitors build confidence without opening another tab.",
    list: ["One connected reviews display", "Styling matched to the website", "Review and directions links"]
  },
  newsletter: {
    preview: `<p class="preview-kicker">STAY IN THE LOOP</p><h3>Useful updates, only when they matter.</h3><label>YOUR NAME</label><div class="fake-input">Jane</div><label>EMAIL ADDRESS</label><div class="fake-input">jane@example.com</div><button class="fake-button" type="button">Join the list <span>→</span></button><p class="mini-consent">Unsubscribe anytime. No clutter.</p>`,
    title: "New subscribers join the right Mailchimp list.",
    copy: "The form feels native to your website while Mailchimp handles confirmation, the welcome email, and unsubscribes.",
    list: ["One signup form and audience", "Name and email fields", "One basic welcome email"]
  },
  analytics: {
    preview: `<p class="preview-kicker">PRIVATE WEBSITE ANALYTICS</p><h3>See what’s working.</h3><div class="metric-row"><div><small>VISITORS</small><strong>1,248</strong><em>+18%</em></div><div><small>TOP PAGE</small><strong>Services</strong><em>42%</em></div></div><div class="chart" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="source-row"><span>Search</span><b>52%</b><span>Direct</span><b>31%</b></div>`,
    title: "Useful traffic insights, without ad-based tracking.",
    copy: "Cloudflare Web Analytics shows visits, popular pages, referrals, countries, and performance in a simple client-owned dashboard.",
    list: ["Visitor and page-view reports", "Referral and popular-page insights", "Basic dashboard instructions"]
  }
};

const tabs = [...document.querySelectorAll('.demo-tab')];
const preview = document.querySelector('#preview-body');
const title = document.querySelector('#result-title');
const copy = document.querySelector('#result-copy');
const list = document.querySelector('#result-list');

function selectDemo(key) {
  const demo = demos[key];
  if (!demo) return;
  tabs.forEach((tab) => {
    const active = tab.dataset.demo === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  preview.animate([{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 280, easing: 'ease-out' });
  preview.innerHTML = demo.preview;
  title.textContent = demo.title;
  copy.textContent = demo.copy;
  list.innerHTML = demo.list.map((item, index) => `<li><span>0${index + 1}</span>${item}</li>`).join('');
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDemo(tab.dataset.demo));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    tabs[next].focus();
    selectDemo(tabs[next].dataset.demo);
  });
});

const featureData = {
  forms: { service: 'GOOGLE FORMS', cost: 'Free option available', title: 'Turn interest into an organized inquiry.', description: 'Visitors can request an estimate or provide project details. You receive a notification, and every answer is organized automatically in Google Sheets.', includes: ['Up to 10 standard questions', 'Required fields and confirmation', 'One round of wording changes', 'Complete testing'], manages: 'Provide the questions, monitor submissions, and respond to customers.', outcome: 'A clear inquiry path and an organized record of every response.', boundary: 'Responding to leads, customer management, and unlimited form changes are not included.' },
  chat: { service: 'TAWK.TO', cost: 'Core chat is free', title: 'Be available without hovering over the website.', description: 'Visitors can start a real conversation or leave a message when no one is online. Notifications can reach a phone or computer.', includes: ['One branded chat window', 'Online and offline hours', 'Up to five quick replies', 'Basic answering instructions'], manages: 'Provide someone to answer messages and manage conversations.', outcome: 'A quick, human way for visitors to reach the business.', boundary: 'This is not an automated chatbot and does not include someone answering on your behalf.' },
  booking: { service: 'GOOGLE CALENDAR', cost: 'Free option available', title: 'Let customers choose a time without calling.', description: 'A booking button or embedded page shows real availability and adds confirmed appointments directly to your calendar.', includes: ['One appointment type', 'Days, hours, length, and buffer', 'Automatic confirmation', 'Phone, in-person, or Google Meet setup'], manages: 'Keep availability current and handle cancellations, rescheduling, and follow-up.', outcome: 'A smoother path from website visit to confirmed appointment.', boundary: 'Payment collection and advanced premium scheduling are not included.' },
  email: { service: 'MAILCHIMP', cost: 'Limited free plan', title: 'Build an audience you can reach again.', description: 'A branded signup form connects the website to one Mailchimp audience, with confirmation and a basic welcome email.', includes: ['One signup form', 'Name and email fields', 'One contact list', 'Welcome email and unsubscribe setup'], manages: 'Create and send future newsletters and maintain the contact list responsibly.', outcome: 'Visitors can join your mailing list without leaving the website.', boundary: 'Future newsletter writing, sending, list management, and subscription fees are not included.' },
  reviews: { service: 'GOOGLE + SOCIABLEKIT', cost: 'Free option available', title: 'Bring real reputation into the page.', description: 'Recent Google reviews can update on the website while profile, direction, and review links keep the next step close.', includes: ['One reviews display', 'Business profile connection', 'Leave-a-review link', 'Mobile and desktop testing'], manages: 'Maintain the Google Business Profile and respond to reviews.', outcome: 'Visitors can confirm trust, location, and legitimacy more quickly.', boundary: 'Reviews cannot be written, edited, removed, or guaranteed by the website developer.' },
  map: { service: 'GOOGLE MAPS', cost: 'Standard embed is free', title: 'Make finding the business feel effortless.', description: 'An interactive, mobile-friendly map shows the correct location and opens clear directions for the visitor.', includes: ['One interactive map', 'Correct business location', 'Directions button', 'Optional Street View when available'], manages: 'Provide the correct address and share any future location change.', outcome: 'Visitors can understand the location and start directions quickly.', boundary: 'Advanced mapping systems, multiple locations, and custom geographic data are outside this setup.' },
  video: { service: 'YOUTUBE', cost: 'Standard embeds are free', title: 'Show the work instead of only describing it.', description: 'Responsive video embeds make room for demonstrations, testimonials, introductions, tours, and answers to common questions.', includes: ['Up to three videos or one playlist', 'Titles and supporting text', 'Responsive display', 'Privacy-enhanced embedding when appropriate'], manages: 'Own the channel and provide finished videos, captions, descriptions, and usage permission.', outcome: 'Visitors can understand the service through useful, on-page video.', boundary: 'Recording, editing, captioning, and uploading are separate services.' },
  analytics: { service: 'CLOUDFLARE WEB ANALYTICS', cost: 'Free', title: 'Understand traffic without advertising trackers.', description: 'A client-owned dashboard shows visits, page views, referrals, countries, popular pages, and useful performance signals.', includes: ['Analytics connection', 'Visitor and page-view reports', 'Referral and popular-page insights', 'Dashboard instructions and verification'], manages: 'Review the reports and decide how the information should guide the business.', outcome: 'A private, understandable picture of how the website is being used.', boundary: 'Ongoing analysis, advertising reports, marketing strategy, and guaranteed traffic growth are not included.' }
};

const featureButtons = [...document.querySelectorAll('.feature-item')];
const featureDetail = document.querySelector('.feature-detail');
function selectFeature(key) {
  const data = featureData[key];
  if (!data) return;
  featureButtons.forEach((button) => button.classList.toggle('active', button.dataset.feature === key));
  document.querySelector('#feature-service').textContent = data.service;
  document.querySelector('#feature-cost').textContent = data.cost;
  document.querySelector('#feature-title').textContent = data.title;
  document.querySelector('#feature-description').textContent = data.description;
  document.querySelector('#feature-includes').innerHTML = data.includes.map((item) => `<li>${item}</li>`).join('');
  document.querySelector('#feature-manages').textContent = data.manages;
  document.querySelector('#feature-outcome').textContent = data.outcome;
  document.querySelector('#feature-boundary').textContent = data.boundary;
  featureDetail.animate([{ opacity: .45, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 240, easing: 'ease-out' });
}
featureButtons.forEach((button) => button.addEventListener('click', () => selectFeature(button.dataset.feature)));

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

