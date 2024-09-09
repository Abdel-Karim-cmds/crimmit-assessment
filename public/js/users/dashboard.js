
$("#menu-toggle").click(function (e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled");
});
$("#menu-toggle-2").click(function (e) {
   e.preventDefault();
   $("#wrapper").toggleClass("toggled-2");
   $('#menu ul').hide();
});

function initMenu() {
   $('#menu ul').hide();
   $('#menu ul').children('.current').parent().show();
   //$('#menu ul:first').show();
   $('#menu li a').click(
      function () {
         var checkElement = $(this).next();
         if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
         }
         if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
         }
      }
   );
}
$(document).ready(function () {
   initMenu();
});


// Notifications

const toasts = document.querySelector('#toasts');

const createNotification = (message, type, time = 3000) => {
   console.log(message, type);
   const toast = document.createElement('div');
   toast.classList.add('toast');
   toast.innerText = message;
   toast.classList.add(type);
   toasts.appendChild(toast);
   setTimeout(() => {
      toast.remove();
   }, time);
};


async function logout() {
   const access_token = localStorage.getItem('access_token');
   const response = await fetch('/auth/logout', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}`
      }
   });
   const data = await response.json();
   console.log(data);
   if (response.status === 200) {
      createNotification(data.message, 'success');
      localStorage.removeItem('access_token');
      localStorage.removeItem('role')
      window.location.href = '/';
   } else {
      createNotification(data.message, 'error');
   }
}

const quotes = [
   {
      "q": "Use your smile to change the world but don't let the world change your smile.",
      "a": "Unknown",
      "c": "77",
      "h": "<blockquote>&ldquo;Use your smile to change the world but don't let the world change your smile.&rdquo; &mdash; <footer>Unknown</footer></blockquote>"
   },
   {
      "q": "What loneliness is more lonely than distrust?",
      "a": "George Eliot",
      "c": "45",
      "h": "<blockquote>&ldquo;What loneliness is more lonely than distrust?&rdquo; &mdash; <footer>George Eliot</footer></blockquote>"
   },
   {
      "q": "A person hears only what they understand.",
      "a": "Johann Wolfgang von Goethe",
      "c": "41",
      "h": "<blockquote>&ldquo;A person hears only what they understand.&rdquo; &mdash; <footer>Johann Wolfgang von Goethe</footer></blockquote>"
   },
   {
      "q": "Start each day with a positive thought and a grateful heart.",
      "a": "Roy T. Bennett",
      "c": "60",
      "h": "<blockquote>&ldquo;Start each day with a positive thought and a grateful heart.&rdquo; &mdash; <footer>Roy T. Bennett</footer></blockquote>"
   },
   {
      "q": "Whatever happens always happens on time.",
      "a": "Zen Proverb",
      "c": "40",
      "h": "<blockquote>&ldquo;Whatever happens always happens on time.&rdquo; &mdash; <footer>Zen Proverb</footer></blockquote>"
   },
   {
      "q": "People who avoid failure also avoid success.",
      "a": "Robert Kiyosaki",
      "c": "44",
      "h": "<blockquote>&ldquo;People who avoid failure also avoid success.&rdquo; &mdash; <footer>Robert Kiyosaki</footer></blockquote>"
   },
   {
      "q": "If you do not get the chills when you set your goal you're not setting big enough goals.",
      "a": "Bob Proctor",
      "c": "88",
      "h": "<blockquote>&ldquo;If you do not get the chills when you set your goal you're not setting big enough goals.&rdquo; &mdash; <footer>Bob Proctor</footer></blockquote>"
   },
   {
      "q": "Give a man a fish and you feed him for a day. Teach a man to fish and you feed him for a lifetime.",
      "a": "Lao Tzu",
      "c": "98",
      "h": "<blockquote>&ldquo;Give a man a fish and you feed him for a day. Teach a man to fish and you feed him for a lifetime.&rdquo; &mdash; <footer>Lao Tzu</footer></blockquote>"
   },
   {
      "q": "Whatever we plant in our subconscious mind and nourish with repetition and emotion will one day become reality.",
      "a": "Earl Nightingale",
      "c": "111",
      "h": "<blockquote>&ldquo;Whatever we plant in our subconscious mind and nourish with repetition and emotion will one day become reality.&rdquo; &mdash; <footer>Earl Nightingale</footer></blockquote>"
   },
   {
      "q": "Go and do the things you can't. That is how you get to do them.",
      "a": "Pablo Picasso",
      "c": "63",
      "h": "<blockquote>&ldquo;Go and do the things you can't. That is how you get to do them.&rdquo; &mdash; <footer>Pablo Picasso</footer></blockquote>"
   },
   {
      "q": "The truth is simple. If it was complicated, everyone would understand it.",
      "a": "Walt Whitman",
      "c": "73",
      "h": "<blockquote>&ldquo;The truth is simple. If it was complicated, everyone would understand it.&rdquo; &mdash; <footer>Walt Whitman</footer></blockquote>"
   },
   {
      "q": "Wheresoever you go, go with all your heart.",
      "a": "Confucius",
      "c": "43",
      "h": "<blockquote>&ldquo;Wheresoever you go, go with all your heart.&rdquo; &mdash; <footer>Confucius</footer></blockquote>"
   },
   {
      "q": "Worry is a waste of emotional reserve.",
      "a": "Ayn Rand",
      "c": "38",
      "h": "<blockquote>&ldquo;Worry is a waste of emotional reserve.&rdquo; &mdash; <footer>Ayn Rand</footer></blockquote>"
   },
   {
      "q": "Change is hardest at the beginning, messiest in the middle and best at the end.",
      "a": "Robin Sharma",
      "c": "79",
      "h": "<blockquote>&ldquo;Change is hardest at the beginning, messiest in the middle and best at the end.&rdquo; &mdash; <footer>Robin Sharma</footer></blockquote>"
   },
   {
      "q": "You are not the drop in the ocean, but the ocean in the drop.",
      "a": "Deepak Chopra",
      "c": "61",
      "h": "<blockquote>&ldquo;You are not the drop in the ocean, but the ocean in the drop.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
   },
   {
      "q": "If you see a get rich quick scheme, that's someone else trying to get rich off of you.",
      "a": "Naval Ravikant",
      "c": "86",
      "h": "<blockquote>&ldquo;If you see a get rich quick scheme, that's someone else trying to get rich off of you.&rdquo; &mdash; <footer>Naval Ravikant</footer></blockquote>"
   },
   {
      "q": "Better a diamond with a flaw than a pebble without one.",
      "a": "Chinese Proverb",
      "c": "55",
      "h": "<blockquote>&ldquo;Better a diamond with a flaw than a pebble without one.&rdquo; &mdash; <footer>Chinese Proverb</footer></blockquote>"
   },
   {
      "q": "What worries you, masters you.",
      "a": "John Locke",
      "c": "30",
      "h": "<blockquote>&ldquo;What worries you, masters you.&rdquo; &mdash; <footer>John Locke</footer></blockquote>"
   },
   {
      "q": "Misfortune shows those who are not really friends.",
      "a": "Aristotle",
      "c": "50",
      "h": "<blockquote>&ldquo;Misfortune shows those who are not really friends.&rdquo; &mdash; <footer>Aristotle</footer></blockquote>"
   },
   {
      "q": "In matters of style, swim with the current; in matters of principle, stand like a rock.",
      "a": "Thomas Jefferson",
      "c": "87",
      "h": "<blockquote>&ldquo;In matters of style, swim with the current; in matters of principle, stand like a rock.&rdquo; &mdash; <footer>Thomas Jefferson</footer></blockquote>"
   },
   {
      "q": "Each day provides it's own gifts.",
      "a": "Marcus Aurelius",
      "c": "33",
      "h": "<blockquote>&ldquo;Each day provides it's own gifts.&rdquo; &mdash; <footer>Marcus Aurelius</footer></blockquote>"
   },
   {
      "q": "Love is not about possession. Love is about appreciation.",
      "a": "Osho",
      "c": "57",
      "h": "<blockquote>&ldquo;Love is not about possession. Love is about appreciation.&rdquo; &mdash; <footer>Osho</footer></blockquote>"
   },
   {
      "q": "You are now, and you do become, what you think about.",
      "a": "Earl Nightingale",
      "c": "53",
      "h": "<blockquote>&ldquo;You are now, and you do become, what you think about.&rdquo; &mdash; <footer>Earl Nightingale</footer></blockquote>"
   },
   {
      "q": "There's more to life than being a passenger.",
      "a": "Amelia Earhart",
      "c": "44",
      "h": "<blockquote>&ldquo;There's more to life than being a passenger.&rdquo; &mdash; <footer>Amelia Earhart</footer></blockquote>"
   },
   {
      "q": "He who loses wealth loses much; he who loses a friend loses more; but he that loses his courage loses all.",
      "a": "Miguel de Cervantes",
      "c": "106",
      "h": "<blockquote>&ldquo;He who loses wealth loses much; he who loses a friend loses more; but he that loses his courage loses all.&rdquo; &mdash; <footer>Miguel de Cervantes</footer></blockquote>"
   },
   {
      "q": "What the caterpillar calls the end of the world, the master calls a butterfly.",
      "a": "Richard Bach",
      "c": "78",
      "h": "<blockquote>&ldquo;What the caterpillar calls the end of the world, the master calls a butterfly.&rdquo; &mdash; <footer>Richard Bach</footer></blockquote>"
   },
   {
      "q": "An intelligence test sometimes shows a man how smart he would have been not to have taken it.",
      "a": "Laurence J. Peter",
      "c": "93",
      "h": "<blockquote>&ldquo;An intelligence test sometimes shows a man how smart he would have been not to have taken it.&rdquo; &mdash; <footer>Laurence J. Peter</footer></blockquote>"
   },
   {
      "q": "The more you praise and celebrate your life, the more there is in life to celebrate. ",
      "a": "Oprah Winfrey",
      "c": "85",
      "h": "<blockquote>&ldquo;The more you praise and celebrate your life, the more there is in life to celebrate. &rdquo; &mdash; <footer>Oprah Winfrey</footer></blockquote>"
   },
   {
      "q": "You don't have to control your thoughts; you just have to stop letting them control you.",
      "a": "Dan Millman",
      "c": "88",
      "h": "<blockquote>&ldquo;You don't have to control your thoughts; you just have to stop letting them control you.&rdquo; &mdash; <footer>Dan Millman</footer></blockquote>"
   },
   {
      "q": "Happiness is pretty simple: someone to love, something to do, something to look forward to.",
      "a": "Rita Mae Brown",
      "c": "91",
      "h": "<blockquote>&ldquo;Happiness is pretty simple: someone to love, something to do, something to look forward to.&rdquo; &mdash; <footer>Rita Mae Brown</footer></blockquote>"
   },
   {
      "q": "Life is a constant series of opportunities.",
      "a": "Ming-Dao Deng",
      "c": "43",
      "h": "<blockquote>&ldquo;Life is a constant series of opportunities.&rdquo; &mdash; <footer>Ming-Dao Deng</footer></blockquote>"
   },
   {
      "q": "All life is a manifestation of the spirit, the manifestation of love.",
      "a": "Morihei Ueshiba",
      "c": "69",
      "h": "<blockquote>&ldquo;All life is a manifestation of the spirit, the manifestation of love.&rdquo; &mdash; <footer>Morihei Ueshiba</footer></blockquote>"
   },
   {
      "q": "Learn from the mistakes of others. You can't live long enough to make them all yourself.",
      "a": "Eleanor Roosevelt",
      "c": "88",
      "h": "<blockquote>&ldquo;Learn from the mistakes of others. You can't live long enough to make them all yourself.&rdquo; &mdash; <footer>Eleanor Roosevelt</footer></blockquote>"
   },
   {
      "q": "You can often change your circumstances by changing your attitude.",
      "a": "Eleanor Roosevelt",
      "c": "66",
      "h": "<blockquote>&ldquo;You can often change your circumstances by changing your attitude.&rdquo; &mdash; <footer>Eleanor Roosevelt</footer></blockquote>"
   },
   {
      "q": "No duty is more urgent than that of returning thanks.",
      "a": "James Allen",
      "c": "53",
      "h": "<blockquote>&ldquo;No duty is more urgent than that of returning thanks.&rdquo; &mdash; <footer>James Allen</footer></blockquote>"
   },
   {
      "q": "If you focus on success, you'll have stress. But if you pursue excellence, success will be guaranteed.",
      "a": "Deepak Chopra",
      "c": "102",
      "h": "<blockquote>&ldquo;If you focus on success, you'll have stress. But if you pursue excellence, success will be guaranteed.&rdquo; &mdash; <footer>Deepak Chopra</footer></blockquote>"
   },
   {
      "q": "Facts are the enemy of truth. ",
      "a": "Miguel de Cervantes",
      "c": "30",
      "h": "<blockquote>&ldquo;Facts are the enemy of truth. &rdquo; &mdash; <footer>Miguel de Cervantes</footer></blockquote>"
   },
   {
      "q": "To accomplish big things, I am convinced you must first dream big dreams.",
      "a": "Conrad Hilton",
      "c": "73",
      "h": "<blockquote>&ldquo;To accomplish big things, I am convinced you must first dream big dreams.&rdquo; &mdash; <footer>Conrad Hilton</footer></blockquote>"
   },
   {
      "q": "Gratitude is the fairest blossom which springs from the soul.",
      "a": "Henry Ward Beecher",
      "c": "61",
      "h": "<blockquote>&ldquo;Gratitude is the fairest blossom which springs from the soul.&rdquo; &mdash; <footer>Henry Ward Beecher</footer></blockquote>"
   },
   {
      "q": "It is secondary whether we choose belief or defiance. What is precious is that we are always able to choose.",
      "a": "Ming-Dao Deng",
      "c": "108",
      "h": "<blockquote>&ldquo;It is secondary whether we choose belief or defiance. What is precious is that we are always able to choose.&rdquo; &mdash; <footer>Ming-Dao Deng</footer></blockquote>"
   },
   {
      "q": "Be the reason someone smiles. Be the reason someone feels loved and believes in the goodness in people.",
      "a": "Roy T. Bennett",
      "c": "103",
      "h": "<blockquote>&ldquo;Be the reason someone smiles. Be the reason someone feels loved and believes in the goodness in people.&rdquo; &mdash; <footer>Roy T. Bennett</footer></blockquote>"
   },
   {
      "q": "In youth we run into difficulties. In old age difficulties run into us. ",
      "a": "Beverly Sills",
      "c": "72",
      "h": "<blockquote>&ldquo;In youth we run into difficulties. In old age difficulties run into us. &rdquo; &mdash; <footer>Beverly Sills</footer></blockquote>"
   },
   {
      "q": "The mirror is a worthless invention. The only way to truly see yourself is in the reflection of someone elses. eyes.",
      "a": "Voltaire",
      "c": "116",
      "h": "<blockquote>&ldquo;The mirror is a worthless invention. The only way to truly see yourself is in the reflection of someone elses. eyes.&rdquo; &mdash; <footer>Voltaire</footer></blockquote>"
   },
   {
      "q": "When you have vision it affects your attitude. Your attitude is optimistic rather than pessimistic. ",
      "a": "Charles Swindoll",
      "c": "100",
      "h": "<blockquote>&ldquo;When you have vision it affects your attitude. Your attitude is optimistic rather than pessimistic. &rdquo; &mdash; <footer>Charles Swindoll</footer></blockquote>"
   },
   {
      "q": "Obstacles don't block the path, they are the path.",
      "a": "Zen Proverb",
      "c": "50",
      "h": "<blockquote>&ldquo;Obstacles don't block the path, they are the path.&rdquo; &mdash; <footer>Zen Proverb</footer></blockquote>"
   },
   {
      "q": "You have power over your mind - not outside events. Realize this, and you will find strength.",
      "a": "Marcus Aurelius",
      "c": "93",
      "h": "<blockquote>&ldquo;You have power over your mind - not outside events. Realize this, and you will find strength.&rdquo; &mdash; <footer>Marcus Aurelius</footer></blockquote>"
   },
   {
      "q": "You can't make someone feel good about themselves until you feel good about yourself.",
      "a": "Robin Sharma",
      "c": "85",
      "h": "<blockquote>&ldquo;You can't make someone feel good about themselves until you feel good about yourself.&rdquo; &mdash; <footer>Robin Sharma</footer></blockquote>"
   },
   {
      "q": "Before preparing to improve the world, first look around your own home three times. ",
      "a": "Chinese Proverb",
      "c": "84",
      "h": "<blockquote>&ldquo;Before preparing to improve the world, first look around your own home three times. &rdquo; &mdash; <footer>Chinese Proverb</footer></blockquote>"
   },
   {
      "q": "Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.",
      "a": "Epictetus",
      "c": "102",
      "h": "<blockquote>&ldquo;Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.&rdquo; &mdash; <footer>Epictetus</footer></blockquote>"
   },
   {
      "q": "Go confidently in the direction of your dreams! Live the life you've imagined.",
      "a": "Henry David Thoreau",
      "c": "78",
      "h": "<blockquote>&ldquo;Go confidently in the direction of your dreams! Live the life you've imagined.&rdquo; &mdash; <footer>Henry David Thoreau</footer></blockquote>"
   }
]

function getQuote() {
   const random = Math.floor(Math.random() * quotes.length);
   document.getElementById('quote').innerHTML = quotes[random].q;
   document.getElementById('author').innerHTML = quotes[random].a;
   console.log(quotes.length)
}

getQuote();

document.getElementById('favorite').addEventListener('click', favoriteQuote);

async function favoriteQuote() {
   const quote = document.getElementById('quote').innerHTML;
   const author = document.getElementById('author').innerHTML;
   console.log(quote, author)

   const access_token = localStorage.getItem('access_token');

   const response = await fetch('/users/favorite', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${access_token}`
      },
      body: JSON.stringify({
         quote: quote,
         author: author
      })
   });
   const data = await response.json();

   if (data.success) {

      createNotification(data.message, 'success');
   } else {

      createNotification(data.message, 'error');
   }


}