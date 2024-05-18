import React, { useState } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';

export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const FAQCard = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  padding: 20px;
`;

export const Question = styled.h3`
  font-size: 1.2em;
  margin-bottom: 8px;
`;

export const Answer = styled.p`
  font-size: 1em;
  line-height: 1.4;
  color: #555;
`;

export const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Bold = styled.span`
  font-weight: bold;
`;

const Heading = styled.h2`
  margin-top: 1rem;
  font-size: 1.5em;
  text-align: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 100%;
`;

const faqs = [
  {
    question: "How do I RSVP, and when are RSVPs due?",
    answer: `<p>You may RSVP directly on the wedding website for either yourself, or for your group by <a style='font-weight: 600;color: blue;' href='/rsvp'>visiting the RSVP page</a>, or through the emailed RSVP sent to the email address you provided. Group members are defined as your spouse, children under 18, or plus ones if you have been given one from the bride and groom.</p><br />
    <p>RSVPs will remain editable on your attendee portal until <b>the RSVP deadline of July 31st</b>, after which time all RSVP selections are final and provided to our relevant vendors.</p>`
  },
  {
    question: "Where should I stay?",
    answer: `<p>The couple has secured studio suites, single king, and double queen room blocks at the <b>Hotel Vance and Marriott Residence Inn RiverPlace</b>. <a style='font-weight: 600;color: blue;' href='/hotel-blocks'>Please visit the Hotels page</a> to book rooms at either location. Rooms are available for booking at the discounted rate until <b>August 3, 2024</b>, after which time any remaining rooms unbooked will return to their adjusted market rates.</p>`
  },
  {
    question: "Will there be shuttles or arranged transportation to and from the venue?",
    answer: `While there will not be shuttles running from the hotels to the venue for the wedding day, the hotels available in the block are only 6-8 minutes away from the venue, and Uber/Lyft are highly encouraged as the fares are affordable.`
  },
  {
    question: "Can I park at the venue?",
    answer: `There is limited street parking available at the venue, so ride sharing is encouraged. If you choose to attempt venue parking, there is a small pay to park lot on the corner of <a href='https://maps.app.goo.gl/qnghr3H3mUpDJifK7' target='_blank' style='font-weight: 600;color: blue;'>SE 6th and Alder St</a>, or some street parking around the block.`
  },
  {
    question: "Are kids (under 18) permitted?",
    answer: `Children are welcome, and those guests with children under 18 will already have their children listed as Group members on their RSVP portal.`
  },
  {
    question: "Can I bring a plus one?",
    answer: `It is important to the couple that their wedding be an intimate ceremony and celebration with their close friends and family. Therefore, plus ones have been limited to certain circumstances. If you have been given a plus one, it will be indicated in your RSVP Email Invite and on the RSVP Group Portal.`
  },
  {
    question: "What time does the Ceremony start, and what happens if I arrive late?",
    answer: `The ceremony will begin promptly at 4:00 PM, with cocktail hour and dinner to follow. The couple requests that all guests be seated by 3:55 PM so as not to interrupt the ceremony. Should you arrive after the designated time, the event coordinator will instruct you where to wait until the processional is completed before you may take your seat.`
  },
  {
    question: "What if I have dietary restrictions for dinner?",
    answer: `While the dinner will be a buffet with both meat and vegetarian options, and some vegan friendly sides, the selected catering company is wonderful and can help us accommodate guests food allergies, or vegan diet restrictions as well. The RSVP portal has a section to note any allergy and dietary restrictions you have and will help us to arrange suitable meals for those guests.`
  },
  {
    question: "Will there be an open bar?",
    answer: `The couple will be hosting a <b>partially open bar</b>, in which they will cover a set cost of the drinks for the evening, after which time the bar will transition to cash bar. The venue can accommodate most all major credit/debit cards, cash, and tap to pay for the cash bar portion of the evening. Wine, Beer, Cider, and a Signature Cocktail will be available, as well as non-alcoholic refreshments.`
  },
  {
    question: "What should I wear/not wear?",
    answer: `The Dress code is <b>Cocktail Formal</b> for the event. Please <b><u>refrain</u></b> from wearing the following items: Denim, Shorts, Baseball Caps, Athletic Wear, Athletic Shoes. Need inspiration? <a style='font-weight: 600;color: blue;' href='https://pin.it/1UjE8D8I9' target='_blank'>CLICK HERE to view our Pinterest Inspo Board.</a>`
  },
  {
    question: "Can I take pictures during the ceremony?",
    answer: `It’s an exciting day, and we want everyone to leave with memories made. We do kindly ask however that guests <b><u>refrain</u></b> from taking photos with their cameras, phones, tablets…etc during the ceremony. Our photographer will be capturing every moment so our guests can remain present, and we will be able to display these moments after the wedding on our website for all to access.`
  },
  {
    question: "Where are you registered?",
    answer: `The bride and groom are registered at several stores, and have a Honeyfund set up as well! To access these registries, please visit the <a style='font-weight: 600;color: blue;' href='/registry'>Registry page</a> of the wedding website.`
  },
  {
    question: "Who can I call on the day if I get lost or need directions?",
    answer: `The couple have developed an automated texting system to send out Google Map directions and important parking, and arrival information to all guests the day before and morning of the wedding. All guests should be able to pull up the Google Map directions to the venue straight from their phones! Should you still need additional support locating or accessing the venue, please contact either the Maid of Honor (Jordan Meyers) or Best Man (Ryan Valdez) for assistance.`
  },
  {
    question: "Can I take home any of the decor/centerpieces?",
    answer: `The main table <b>florals</b> themselves are for anyone to take. The vases, candle stick holders, signage, plates, flatware, platters, desserts stands, linens…etc however are not for guests to take as most have been rented. There will be flower bags near the welcome table to bundle stems for the taking.`
  }
];


export const Faq = () => {
  const [query, setQuery] = useState('');
  const fuse = new Fuse(faqs, {
    keys: ['question', 'answer'],
    includeScore: true,
  });

  const results = fuse.search(query);
  const faqResults = query ? results.map(result => result.item) : faqs;
  
  return (
    <>
    <Heading>Frequently Asked Questions</Heading>
    <FAQContainer>
      <SearchInput
        type="text"
        placeholder="Search FAQs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {faqResults.map((faq, index) => (
        <FAQCard key={index}>
          <Question>{faq.question}</Question>
          <Answer dangerouslySetInnerHTML={{ __html: faq.answer }} />
        </FAQCard>
      ))}
    </FAQContainer>
    </>
  );
};

