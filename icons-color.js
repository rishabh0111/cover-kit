/* filled, multi-tone, outlined icon set in the ByteByteGo "lineal-color" style.
   48x48 box.  Each icon gets a palette P={main,light,dark,accent} and returns
   inner SVG.  Parts that animate carry a class the template drives per frame:
     .a-led    server LEDs (blink)          .a-row    db row that drops in on hit
     .a-shk    lock shackle (closes on hit) .a-wob    whole-icon wobble group
     .a-star   sparkles (twinkle)           .a-hand   clock hand (rotates)
     .a-broom  broom (rocks)                .a-bar    queue bars (bob in sequence)
     .a-bob    gentle idle bob              .a-mail   envelope flap                 */
window.CICONS={
 client:P=>`<g class="a-bob">
   <path d="M8 44c0-9.5 6.5-15 16-15s16 5.5 16 15z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M17 31c2 2.2 4.4 3.3 7 3.3s5-1.1 7-3.3" fill="none" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/>
   <circle cx="24" cy="15" r="9.5" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M15.5 13.5c1.5-5 5-7.5 8.5-7.5s7 2.5 8.5 7.5" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <circle cx="20.5" cy="16" r="1.4" fill="${P.dark}"/><circle cx="27.5" cy="16" r="1.4" fill="${P.dark}"/>
 </g>`,
 server:P=>`
   <rect x="6" y="4" width="36" height="40" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="10" y="8" width="28" height="9" rx="2" fill="${P.light}" stroke="${P.dark}" stroke-width="2"/>
   <rect x="10" y="19.5" width="28" height="9" rx="2" fill="${P.light}" stroke="${P.dark}" stroke-width="2"/>
   <rect x="10" y="31" width="28" height="9" rx="2" fill="${P.light}" stroke="${P.dark}" stroke-width="2"/>
   <path d="M13.5 12.5h12M13.5 24h12M13.5 35.5h12" stroke="${P.dark}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
   <circle class="a-led" cx="33" cy="12.5" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="33" cy="24" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="33" cy="35.5" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>`,
 db:P=>`
   <rect class="a-row" x="15" y="-14" width="18" height="6" rx="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.6" opacity="0"/>
   <path d="M8 11v26c0 3.6 7.2 6.5 16 6.5s16-2.9 16-6.5V11" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M8 20c0 3.6 7.2 6.5 16 6.5s16-2.9 16-6.5M8 29c0 3.6 7.2 6.5 16 6.5s16-2.9 16-6.5" fill="none" stroke="${P.dark}" stroke-width="2.4"/>
   <ellipse cx="24" cy="11" rx="16" ry="6.5" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <ellipse cx="24" cy="11" rx="9" ry="3" fill="${P.main}" opacity=".45"/>`,
 queue:P=>`
   <rect x="3" y="12" width="42" height="24" rx="5" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect class="a-bar" x="8" y="17" width="9" height="14" rx="2" fill="${P.main}" stroke="${P.dark}" stroke-width="1.8"/>
   <rect class="a-bar" x="19.5" y="17" width="9" height="14" rx="2" fill="${P.main}" stroke="${P.dark}" stroke-width="1.8" opacity=".78"/>
   <rect class="a-bar" x="31" y="17" width="9" height="14" rx="2" fill="${P.main}" stroke="${P.dark}" stroke-width="1.8" opacity=".55"/>`,
 lock:P=>`
   <path class="a-shk" d="M15 23v-7.5a9 9 0 0 1 18 0V23" fill="none" stroke="${P.dark}" stroke-width="3.2" stroke-linecap="round"/>
   <rect x="9" y="21" width="30" height="22" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="24" cy="30" r="3.4" fill="${P.light}" stroke="${P.dark}" stroke-width="1.6"/>
   <path d="M24 32.5v5" stroke="${P.dark}" stroke-width="2.6" stroke-linecap="round"/>`,
 check:P=>`
   <circle cx="24" cy="24" r="18" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="24" cy="24" r="12.5" fill="${P.light}" opacity=".35"/>
   <path d="M15.5 24.5l6 6 11.5-12" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="M15.5 24.5l6 6 11.5-12" fill="none" stroke="${P.dark}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" opacity=".35"/>`,
 x:P=>`<g class="a-wob">
   <circle cx="24" cy="24" r="18" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="24" cy="24" r="12.5" fill="${P.light}" opacity=".3"/>
   <path d="M17 17l14 14M31 17L17 31" fill="none" stroke="#fff" stroke-width="4.2" stroke-linecap="round"/>
 </g>`,
 broom:P=>`<g class="a-broom"><g transform="rotate(-30 24 24)">
   <path d="M24 2v22" stroke="${P.dark}" stroke-width="5.2" stroke-linecap="round"/>
   <path d="M24 3v20" stroke="${P.light}" stroke-width="2" stroke-linecap="round"/>
   <rect x="17" y="22" width="14" height="7" rx="2" fill="${P.main}" stroke="${P.dark}" stroke-width="2.2"/>
   <path d="M15 29h18l5 16H10z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M18 33l-2 9M24 33v9M30 33l2 9" stroke="${P.dark}" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>
 </g></g>`,
 clock:P=>`
   <circle cx="24" cy="24" r="18" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="24" cy="24" r="13.5" fill="${P.main}" opacity=".18"/>
   <path d="M24 9v3M24 36v3M9 24h3M36 24h3" stroke="${P.dark}" stroke-width="2.2" stroke-linecap="round"/>
   <path class="a-hand" d="M24 24V13" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <path d="M24 24l7 4" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <circle cx="24" cy="24" r="2.2" fill="${P.dark}"/>`,
 mail:P=>`
   <rect x="4" y="11" width="40" height="28" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path class="a-mail" d="M4 14l20 14 20-14" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M4 36l14-11M44 36L30 25" fill="none" stroke="${P.dark}" stroke-width="2" opacity=".6"/>`,
 webhook:P=>`
   <path d="M18 14a8 8 0 1 1 13.5 5.8L24 34" fill="none" stroke="${P.dark}" stroke-width="7" stroke-linecap="round"/>
   <path d="M18 14a8 8 0 1 1 13.5 5.8L24 34" fill="none" stroke="${P.main}" stroke-width="3.6" stroke-linecap="round"/>
   <path d="M10 26a8 8 0 1 0 12.5 8.5H36" fill="none" stroke="${P.dark}" stroke-width="7" stroke-linecap="round"/>
   <path d="M10 26a8 8 0 1 0 12.5 8.5H36" fill="none" stroke="${P.light}" stroke-width="3.6" stroke-linecap="round"/>
   <circle cx="36" cy="34.5" r="6" fill="${P.accent}" stroke="${P.dark}" stroke-width="2.2"/>`,
 bell:P=>`<g class="a-wob">
   <path d="M12 32V21a12 12 0 0 1 24 0v11l4 5H8z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M16 32V21a8 8 0 0 1 8-8" fill="none" stroke="${P.light}" stroke-width="2.4" stroke-linecap="round"/>
   <path d="M19 40a5 5 0 0 0 10 0" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="24" cy="7" r="2.6" fill="${P.light}" stroke="${P.dark}" stroke-width="2"/>
   <path d="M9 41L39 7" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
   <path d="M9 41L39 7" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
 </g>`,
 shield:P=>`<g class="a-pulse">
   <path d="M24 4l16 6v12c0 9.5-6.8 16.8-16 20-9.2-3.2-16-10.5-16-20V10z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M24 9l11 4v9c0 6.8-4.7 12.3-11 15V9z" fill="${P.light}" opacity=".8"/>
   <path d="M16.5 24l5 5 10-10.5" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
 </g>`,
 key:P=>`<g class="a-wob">
   <circle cx="16" cy="18" r="10" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="16" cy="18" r="3.6" fill="${P.light}" stroke="${P.dark}" stroke-width="1.8"/>
   <path d="M24 24l16 16M34 34l4-4M39 39l4-4" stroke="${P.dark}" stroke-width="5" stroke-linecap="round"/>
   <path d="M24 24l16 16M34 34l4-4M39 39l4-4" stroke="${P.main}" stroke-width="2" stroke-linecap="round"/>
 </g>`,
 doc:P=>`
   <path d="M11 4h18l10 10v30H11z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M29 4v10h10" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path class="a-flash" d="M17 22h14M17 28h14M17 34h9" stroke="${P.main}" stroke-width="3" stroke-linecap="round"/>`,
 robot:P=>`
   <path d="M24 4v6" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/><circle cx="24" cy="4" r="2.5" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.6"/>
   <rect x="8" y="10" width="32" height="26" rx="6" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="12" y="15" width="24" height="14" rx="4" fill="${P.light}" stroke="${P.dark}" stroke-width="1.8"/>
   <g class="a-blink" transform-origin="18 22"><circle cx="18" cy="22" r="2.8" fill="${P.dark}"/></g>
   <g class="a-blink" transform-origin="30 22"><circle cx="30" cy="22" r="2.8" fill="${P.dark}"/></g>
   <path d="M16 40h16M20 36v4M28 36v4" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/>
   <path d="M4 18v8M44 18v8" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>`,
 search:P=>`
   <path d="M11 4h18l10 10v30H11z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M17 22h10M17 28h14M17 34h8" stroke="${P.main}" stroke-width="2.6" stroke-linecap="round" opacity=".7"/>
   <g class="a-scan"><circle cx="30" cy="30" r="9" fill="${P.main}" fill-opacity=".35" stroke="${P.dark}" stroke-width="2.8"/>
   <path d="M36.5 36.5l7 7" stroke="${P.dark}" stroke-width="4.5" stroke-linecap="round"/></g>`,
 table:P=>`
   <rect x="4" y="8" width="40" height="32" rx="4" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="4" y="8" width="40" height="9" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M4 25h40M4 33h40M18 17v23M31 17v23" stroke="${P.dark}" stroke-width="1.8"/>
   <rect class="a-flash" x="6" y="26" width="36" height="6" fill="${P.main}" opacity=".5"/>`,
 gear:P=>`<g class="a-spin">
   <path d="M24 4l4 4h6l1.5 5.5 5.5 3v6l-4 4v6l-5.5 1.5-3 5.5h-6l-4-4h-6l-1.5-5.5-5.5-3v-6l4-4v-6l5.5-1.5 3-5.5z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round" transform="rotate(22.5 24 24)"/>
   <circle cx="24" cy="24" r="7" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
 </g>`,
 cloud:P=>`<g class="a-bob">
   <path d="M14 38h22a8 8 0 0 0 1-15.9A11 11 0 0 0 16 18.5 7.5 7.5 0 0 0 14 38z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M17 33h18a5 5 0 0 0 .5-10" fill="none" stroke="${P.light}" stroke-width="2.4" stroke-linecap="round"/>
 </g>`,
 globe:P=>`
   <circle cx="24" cy="24" r="19" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <ellipse cx="24" cy="24" rx="8" ry="19" fill="none" stroke="${P.dark}" stroke-width="2"/>
   <path d="M5 24h38M8 14h32M8 34h32" stroke="${P.dark}" stroke-width="2"/>
   <path d="M24 5v38" stroke="${P.dark}" stroke-width="2"/>
   <g class="a-slide"><circle cx="31" cy="17" r="3.2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.6"/></g>`,
 split:P=>`
   <circle cx="9" cy="24" r="6" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="39" cy="10" r="6" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="39" cy="38" r="6" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M15 22c8 0 10-12 18-12M15 26c8 0 10 12 18 12" fill="none" stroke="${P.dark}" stroke-width="2.6"/>
   <g class="a-slide"><circle cx="24" cy="17" r="2.6" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.4"/></g>`,
 bolt:P=>`<g class="a-pulse">
   <path d="M27 3L10 27h11l-3 18 20-26H27z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path class="a-flash" d="M25 8l-9 16h6" fill="none" stroke="${P.light}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
 </g>`,
 cache:P=>`
   <rect x="6" y="8" width="36" height="32" rx="5" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="10" y="12" width="28" height="24" rx="3" fill="${P.light}" stroke="${P.dark}" stroke-width="1.8"/>
   <path class="a-flash" d="M26 15l-7 10h6l-2 8 7-10h-6z" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.8" stroke-linejoin="round"/>
   <path d="M14 4v4M24 4v4M34 4v4M14 40v4M24 40v4M34 40v4" stroke="${P.dark}" stroke-width="2.2" stroke-linecap="round"/>`,
 box:P=>`
   <path d="M6 16l18-9 18 9v20l-18 9-18-9z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M6 16l18 9 18-9M24 25v20" fill="none" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M24 25l18-9v20l-18 9z" fill="${P.light}" opacity=".55"/>
   <path d="M15 11.5l18 9" stroke="${P.dark}" stroke-width="2" opacity=".6"/>`,
 phone:P=>`<g class="a-wob">
   <rect x="13" y="3" width="22" height="42" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="16" y="8" width="16" height="28" rx="2" fill="${P.light}" stroke="${P.dark}" stroke-width="1.6"/>
   <circle cx="24" cy="40.5" r="1.8" fill="${P.dark}"/>
   <path class="a-flash" d="M19 15h10M19 20h10M19 25h6" stroke="${P.main}" stroke-width="2.2" stroke-linecap="round"/>
 </g>`,
 chart:P=>`
   <path d="M6 42h36M6 42V6" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/>
   <rect class="a-bar" x="11" y="26" width="7" height="14" rx="1.5" fill="${P.light}" stroke="${P.dark}" stroke-width="2"/>
   <rect class="a-bar" x="21" y="18" width="7" height="22" rx="1.5" fill="${P.main}" stroke="${P.dark}" stroke-width="2"/>
   <rect class="a-bar" x="31" y="10" width="7" height="30" rx="1.5" fill="${P.main}" stroke="${P.dark}" stroke-width="2"/>
   <path d="M12 20l10-8 10-4 8-4" fill="none" stroke="${P.accent}" stroke-width="2.6" stroke-linecap="round"/>`,
 wallet:P=>`
   <rect x="4" y="12" width="40" height="28" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M4 18V12a4 4 0 0 1 4-4h26v8" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <rect x="28" y="22" width="16" height="10" rx="3" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2"/>
   <circle class="a-flash" cx="35" cy="27" r="2.4" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.4"/>`,
 team:P=>`<g class="a-bob">
   <circle cx="15" cy="16" r="6.5" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2"/>
   <path d="M3 40c0-8 5-12 12-12s12 4 12 12z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2" stroke-linejoin="round"/>
   <circle cx="31" cy="14" r="7" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M18 42c0-9 5.5-14 13-14s13 5 13 14z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
 </g>`,
 scale:P=>`
   <path d="M24 6v34M12 42h24" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <g class="a-wob"><path d="M6 14h36" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <path d="M4 26l6-12 6 12z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.2" stroke-linejoin="round"/>
   <path d="M32 26l6-12 6 12z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2" stroke-linejoin="round"/></g>
   <circle cx="24" cy="10" r="3" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.6"/>`,
 star:P=>`<g class="a-pulse">
   <path d="M24 4l6 13 14 1.5-10.5 9.5 3 14L24 35l-12.5 7 3-14L4 18.5 18 17z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M24 11l3.5 8 8.5 1-6.5 6" fill="none" stroke="${P.light}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
 </g>`,
 token:P=>`<g class="a-pulse">
   <rect x="4" y="12" width="40" height="24" rx="12" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="16" cy="24" r="7" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2"/>
   <path d="M27 20h11M27 28h8" stroke="${P.light}" stroke-width="2.6" stroke-linecap="round"/>
 </g>`,
 hourglass:P=>`<g class="a-wob">
   <path d="M12 5h24M12 43h24" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <path d="M14 6c0 9 6 13 10 18-4 5-10 9-10 18h20c0-9-6-13-10-18 4-5 10-9 10-18z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M18 9h12c0 5-4 8-6 11-2-3-6-6-6-11z" fill="${P.main}"/>
   <path d="M17 40h14c0-6-4-8-7-11-3 3-7 5-7 11z" fill="${P.main}"/>
 </g>`,
 eye:P=>`
   <path d="M3 24s7.5-13 21-13 21 13 21 13-7.5 13-21 13S3 24 3 24z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <g class="a-scan"><circle cx="24" cy="24" r="8" fill="${P.main}" stroke="${P.dark}" stroke-width="2.2"/><circle cx="24" cy="24" r="3.5" fill="${P.dark}"/><circle cx="27" cy="21" r="1.6" fill="#fff"/></g>`,
 user:P=>`<g class="a-bob">
   <path d="M8 44c0-9.5 6.5-15 16-15s16 5.5 16 15z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <circle cx="24" cy="15" r="9.5" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
 </g>`,
 lb:P=>`
   <rect x="4" y="18" width="40" height="12" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M12 18V8h24v10M12 30v10h24V30M24 8V4M24 40v4" fill="none" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/>
   <circle class="a-led" cx="12" cy="24" r="2.2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="24" cy="24" r="2.2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="36" cy="24" r="2.2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>`,
 idcard:P=>`
   <rect x="4" y="9" width="40" height="30" rx="4" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="4" y="9" width="40" height="7" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <circle cx="15" cy="27" r="5" fill="${P.main}" stroke="${P.dark}" stroke-width="2"/>
   <path class="a-flash" d="M25 24h13M25 30h9" stroke="${P.main}" stroke-width="2.6" stroke-linecap="round"/>`,
 retry:P=>`<g class="a-spin">
   <path d="M38 24a14 14 0 1 1-4.1-9.9" fill="none" stroke="${P.dark}" stroke-width="6" stroke-linecap="round"/>
   <path d="M38 24a14 14 0 1 1-4.1-9.9" fill="none" stroke="${P.main}" stroke-width="2.6" stroke-linecap="round"/>
   <path d="M38 8v9h-9" fill="${P.light}" stroke="${P.dark}" stroke-width="2.6" stroke-linejoin="round"/>
 </g>`,
 rocket:P=>`<g class="a-bob">
   <path d="M24 3c7 4 11 12 11 22l-3 9H16l-3-9C13 15 17 7 24 3z" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M24 3c7 4 11 12 11 22l-3 9H24z" fill="${P.main}" opacity=".7"/>
   <circle cx="24" cy="19" r="4.5" fill="${P.accent}" stroke="${P.dark}" stroke-width="2"/>
   <path d="M13 27l-6 8h8M35 27l6 8h-8" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path class="a-flash" d="M20 34l4 10 4-10" fill="${P.accent}" stroke="${P.dark}" stroke-width="2" stroke-linejoin="round"/>
 </g>`,
 cluster:P=>`
   <rect x="14" y="4" width="30" height="26" rx="3" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2"/>
   <rect x="9" y="10" width="30" height="26" rx="3" fill="${P.light}" stroke="${P.dark}" stroke-width="2.2"/>
   <rect x="4" y="16" width="30" height="26" rx="3" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M8 22h14M8 29h14M8 36h14" stroke="${P.dark}" stroke-width="2" stroke-linecap="round" opacity=".55"/>
   <circle class="a-led" cx="28" cy="22" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="28" cy="29" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>
   <circle class="a-led" cx="28" cy="36" r="2" fill="${P.accent}" stroke="${P.dark}" stroke-width="1.2"/>`,
 pie:P=>`
   <circle cx="24" cy="24" r="18" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <path class="a-pulse" d="M24 24V6a18 18 0 0 1 17.1 12.4z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>`,
 cursor:P=>`<g class="a-bob">
   <path d="M12 6l26 14-11 3-3 11z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M27 23l10 10" stroke="${P.dark}" stroke-width="4" stroke-linecap="round"/>
   <path d="M27 23l10 10" stroke="${P.light}" stroke-width="1.6" stroke-linecap="round"/>
 </g>`,
 gauge:P=>`
   <path d="M6 34a18 18 0 0 1 36 0" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M6 34h36" stroke="${P.dark}" stroke-width="2.4" stroke-linecap="round"/>
   <path d="M10 34a14 14 0 0 1 7-12" fill="none" stroke="${P.main}" stroke-width="4" stroke-linecap="round"/>
   <path d="M31 22a14 14 0 0 1 7 12" fill="none" stroke="${P.accent}" stroke-width="4" stroke-linecap="round"/>
   <path class="a-wob" d="M24 34L34 20" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <circle cx="24" cy="34" r="3" fill="${P.dark}"/>`,
 calendar:P=>`
   <rect x="5" y="9" width="38" height="34" rx="4" fill="${P.light}" stroke="${P.dark}" stroke-width="2.4"/>
   <rect x="5" y="9" width="38" height="10" rx="4" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4"/>
   <path d="M15 4v9M33 4v9" stroke="${P.dark}" stroke-width="3" stroke-linecap="round"/>
   <rect class="a-flash" x="12" y="25" width="7" height="6" rx="1" fill="${P.main}"/><rect x="21" y="25" width="7" height="6" rx="1" fill="${P.dark}" opacity=".35"/><rect x="30" y="25" width="7" height="6" rx="1" fill="${P.dark}" opacity=".35"/>
   <rect x="12" y="34" width="7" height="6" rx="1" fill="${P.dark}" opacity=".35"/><rect x="21" y="34" width="7" height="6" rx="1" fill="${P.dark}" opacity=".35"/>`,
 crash:P=>`<g class="a-wob">
   <path d="M24 5L4 40h40z" fill="${P.main}" stroke="${P.dark}" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="M24 17v11" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
   <circle cx="24" cy="34" r="2.3" fill="#fff"/>
 </g>`
};
/* 4-point sparkle, centred at 0,0 */
window.SPARK=(r,c)=>`<path d="M0 ${-r}Q${r*.18} ${-r*.18} ${r} 0Q${r*.18} ${r*.18} 0 ${r}Q${-r*.18} ${r*.18} ${-r} 0Q${-r*.18} ${-r*.18} 0 ${-r}z" fill="${c}"/>`;
