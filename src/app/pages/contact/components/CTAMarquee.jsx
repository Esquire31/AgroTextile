// 'use client';

// import { Circle } from 'lucide-react';

// export default function CTAMarquee() {
//   const items = ['Precision Logistics', 'Global Reach', 'Industrial Excellence', 'AgroTextile Global'];

//   return (
//     <div
//       className="py-12 bg-primary overflow-hidden border-y"
//       style={{ borderColor: 'color-mix(in srgb, var(--color-outline-variant) 10%, transparent)' }}
//     >
//       <div className="flex whitespace-nowrap animate-marquee">
//         <div className="flex gap-12 items-center text-on-primary font-bold text-headline-lg-mobile uppercase italic tracking-tighter">
//           {items.map((item, idx) => (
//             <span key={`first-${idx}`}>
//               {item}
//               {idx < items.length - 1 && (
//                 <span className="mx-12 inline-block">
//                   <Circle className="text-on-primary text-4xl w-4 h-4" fill="currentColor" />
//                 </span>
//               )}
//             </span>
//           ))}
//         </div>
//         <div className="flex gap-12 items-center text-on-primary font-bold text-headline-lg-mobile uppercase italic tracking-tighter ml-12">
//           {items.map((item, idx) => (
//             <span key={`second-${idx}`}>
//               {item}
//               {idx < items.length - 1 && (
//                 <span className="mx-12 inline-block">
//                   <Circle className="text-on-primary text-4xl w-4 h-4" fill="currentColor" />
//                 </span>
//               )}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }