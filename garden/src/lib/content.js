import {
  covers,
  liveGallery,
  livePhotos,
  memberPhotos,
  memberSlides,
  posterFiles,
} from './media';
import { AGENDA_YEAR } from '@shared/lib/site';

export const band = {
  name: 'Garden Psychedelia',
  since: 2019,
  city: 'Campos dos Goytacazes',
  state: 'RJ',
  email: 'talktogarden@gmail.com',
  instagram: 'https://www.instagram.com/gardenpsychedelia',
  spotify: 'https://open.spotify.com/intl-pt/artist/2Gz78gC3i0E5nLHKwzfGGh',
  youtube: 'https://www.youtube.com/channel/UC6rGfPAbTqQWj3DCwdwvaDw',
  tiktok: 'https://www.tiktok.com/@gardenpsyched',
  monthlyListeners: 60,
  followers: 438,
  quote:
    'A apoteose da amizade. A explosão energética gerada por estética e demanda. A Garden existe para suprir a necessidade da expressão genuína.',
  about:
    'Desde 2019, por amigos e para todos. Nossa base é Rock and Roll, mas nossas referências são maiores que os nossos rótulos. Vivemos a produção, mas namoramos a plateia. Queremos te provocar, queremos te impressionar. Agenda sempre aberta.',
  live:
    'Com cinco shows em diferentes espaços e encontros, 2025 foi um ano de expansão e consolidação da Garden nos palcos, fortalecendo a conexão entre sua música autoral e a comunidade que movimenta a cultura independente da cidade. Em 2026, a Garden abre um novo capítulo com o single “DBAWOT” e a chegada de um novo EP,',
};

export const members = [
  { name: 'Milton', role: 'Vocal', image: memberPhotos.milton, images: memberSlides.milton },
  { name: 'Gabriel', role: 'Guitarra', image: memberPhotos.gabriel, images: memberSlides.gabriel },
  { name: 'Matheus', role: 'Guitarra', image: memberPhotos.matheus, images: memberSlides.matheus },
  { name: 'Bianca', role: 'Bateria', image: memberPhotos.bianca, images: memberSlides.bianca },
  { name: 'Bob', role: 'Baixo', image: memberPhotos.bob, images: memberSlides.bob },
];

export const navItems = [
  { to: '/banda', index: '01', label: 'A banda' },
  { to: '/shows', index: '02', label: 'Shows' },
  { to: '/sons', index: '03', label: 'Nossas músicas' },
  { to: '/contato', index: '04', label: 'Contato' },
];

// Home = vitrine. Uma linha por seção, cada uma linkando para a página cheia.
export const homeIntro =
  'Psicodelia como referência. Alternativo por natureza.';

export const homeSections = [
  {
    to: '/banda',
    index: '01',
    label: 'Banda',
    cta: 'Conhecer a banda',
    teaser: 'Cinco amigos em Campos dos Goytacazes, na cena do rock alternativo desde 2019.',
    image: livePhotos.festivalBand,
  },
  {
    to: '/shows',
    index: '02',
    label: 'Shows',
    cta: 'Ver a agenda',
    teaser: 'Festival Troque o Disco, as Weird Parties e próximos shows.',
    image: posterFiles.weirdParty4,
  },
  {
    to: '/sons',
    index: '03',
    label: 'Sons',
    cta: 'Ouvir a Garden',
    teaser: 'Dbawot é o lançamento mais recente e marca a volta da Garden.',
    image: covers.dbawot,
  },
  {
    to: '/contato',
    index: '04',
    label: 'Contato',
    cta: 'Falar com a Garden',
    teaser:
      'talktogarden@gmail.com — para shows, festivais e o corre do ao vivo.',
    image: livePhotos.wp3Milton,
  },
];

export const releases = [
  {
    slug: 'dbawot',
    title: 'Dbawot',
    year: 2026,
    type: 'Single',
    plays: '2.198',
    featured: true,
    cover: covers.dbawot,
    coverCredit: 'Arte por Marina Vicente',
    note: 'Lançamento mais recente. A síntese da nossa nova identidade sonora.',
    spotifyTrackId: '0YznfY0th8l3O1CBo61SHL',
    lyrics: `I saw you yesterday
You went out just to please me
I have to thank you, but baby
You weren't doing nothing but pleasing

So don't waste my time
Don't waste my time on telling lies
Easy to play just roll the dice
Don't waste my time
So don't waste my time

So don't waste my time
You're such a waste of time
So don't waste my time
Don't waste my time
So don't waste my time
So don't waste my time
Don't waste my

I lost you yesterday
It was really heartbreaking
The attitude in my ways
Disgusting you from the beginning

Why did you waste my time?
Why did you waste your time?
Why did you waste our time?
We didn't waste any time
We did not waste any time

So don't waste my time
You are the love of my life
Don't waste my time
You are a waste of time
Don't waste my time
Don't waste my time…
Don't waste my time
Don't waste my

Yesterday was so crowded
But anyway, I felt so alone
I couldn't hear my name even if they shouted
Crowded
Shouted
Alone
I couldn't hear my name even if they shouted`,
  },
  {
    slug: 'we-again',
    title: 'We Again',
    year: 2019,
    type: 'Single',
    plays: '19.614',
    featured: false,
    cover: livePhotos.festivalBand,
    note: 'A faixa mais ouvida. O primeiro registro da Garden, onde tudo começa.',
    spotifyTrackId: '30FhEKYtCzszR56DCrouxu',
    lyrics: `I cannot understand
What passes in your hand
And comes to mine

I cannot believe
In what you did see
And slipped away

Can't stay right here with you
Can't stay without you anywhere

I am free
To fly away
Without you
I'm a man
And i can't leave it
Again

I again
High again
I again
We're like dinosaurs again
We are like dinosaurs here again
We're like dinosaurs
We again
We're like dinosaurs
We again
We again
We again
I again`,
  },
  {
    slug: 'shell',
    title: 'Shell',
    year: 2019,
    type: 'Single',
    plays: '13.310',
    featured: false,
    cover: livePhotos.wp4Matheus,
    note: 'O segundo som. Ainda 2019, ainda o primeiro fôlego.',
    spotifyTrackId: '3U1sUWMpYioR3J6R1m6SIQ',
    lyrics: `It's hard to see that
We dont need to hide behind this shell
It's hard to see that
We don't need that thing
At all

You don't need to
Stay looking around
For something to hold on
You can just go
And than come back
To see them all

And than i escaped from that shell that sang: comeback to me, baby
And than i ran away from there

Everyday in my house
Getting high
I can't see a thing
Tonight ...

Rolling in the grass
Sailing in the sand again
Rocking everyday
Rocking everynight
With them

And than i realized that i was in the shell again, baby
But now i'm comfortable
Singing
In the sunshine of my life`,
  },
  {
    slug: 'madman',
    title: 'Madman',
    year: 2020,
    type: 'Single',
    plays: '6.544',
    featured: false,
    cover: livePhotos.festivalGabriel,
    note: 'O último som antes da pandemia. Um registro de um tempo que estava prestes a parar.',
    spotifyTrackId: '2plcfAvkI08GVFv13PUmvN',
    lyrics: `He knows well what he wants to do
He can teach you one lesson or two
About enjoying life
He says
You don't need a person to
Be happy, all you need is you
To enjoy life

I just don't know why
Why are you here with me
I just can't stand by
Stand by beside you baby
I just don't know why
Why are you here with me
I just can't stand by
Stand by beside you baby
Uuuuh baby (baby)

But you don't know what he passes trought
I bet he lives harder than you think
He's not telling lies

I just don't know why
Why are you here with me
I just cant stand by
Stand by beside you baby
I just don't know why
Why are you here with me
I just can't stand by
Stand by beside you baby`,
  },
];

// EP 1 — em produção: Éter, Morning Riser, Cos I Lov U e @Me.
export const ep1 = [
  {
    slug: 'morning-riser',
    n: '02',
    title: 'Morning Riser',
    type: 'EP 1',
    audio: '/audio/morning-riser.mp3',
    lyrics: `Sunday morning
I'm feeling that I'm the only one that
Is a morning riser
(Only one)
It came to me
And I don't wanna be the only one
Like boring people
Like boring people

Now I know that
That you won't forget
Now I know that
That you won't regret
Now I know that
You won't forget
And I don't wanna be

I just got to cross this
Now I know that I'm the only one that
Have made you tired
(I just I just I just)
(This this this)

Now I know that
That you won't forget
Now I know that
That you won't regret
Now I know that
You won't forget
And I don't wanna be
(The only one)
(Like boring people)
(I don't wanna be)

Now I know that
That you won't forget
Now I know that
That you won't regret
Now I know that
You won't forget`,
  },
  {
    slug: 'eter',
    n: '01',
    title: 'Éter',
    type: 'EP 1',
    audio: '/audio/eter.mp3',
    lyrics: `Fire
I need your fire
Give me a lighter
Let me burn you
Screaming and feeling
Eating you
Floating, moaning
Flying through
(La)
(La da da da) 3x

Water
Give me some water
I need to drown you
Swimming and breathing
Will kill you
Walking, stalking
Running from you
(La)
(La da da da) 3x`,
  },
  {
    slug: 'cos-i-lov-u',
    n: '03',
    title: 'Cos I Lov U',
    type: 'EP 1',
    audio: '/audio/cos-i-lov-u.mp3',
    lyrics: `I know it's getting harder
We get along everyday
But there's something I would like to say
But I just don't know the way

Because I love you
Because I love you
Because I love you everyday
Because I love you
Because I love you
Because I love you since the first day

I know it's getting warmer
I hold my love everyday
And there's nothing I would like to say
Baby I don't know if I love you anyway

But I love you
Because I love you
Because I love you everyday
Because I love you
Because I love you
Because I love you since the first day

Because I love you
Because I love you
Because I love you everyday
Because I love you
Because I love you
Because I love you since the first day`,
  },
  {
    slug: 'me',
    n: '04',
    title: '@Me',
    type: 'EP 1',
    audio: '/audio/me.mp3',
    lyrics: `Look at me
But I don't wanna…
You said to me,
But I don't wanna hear anything
Anything that's coming out of your mouth

And I don't care
I will be free
I think I have to leave
All that shit you said to me I'll leave behind

I finally know you
Why don't you see?
I moved all the bricks
And every time I look around
I only see my eyes

And I don't care
I'm better free
I think I have to leave
All that shit you said to me I'll leave behind

Look at me
But I don't wanna
You said to me
But I don't wanna hear anything
Anything that's coming out of your mouth

The moss grew over
The ash I see
It burns inside of me
Reminds me of a time I'd rather leave behind

And I don't care
I'm better free
And clean of all that shit
Offer me a bump again and these are your last goodbyes

Look at me
But I don't wanna
You said to me
But I don't wanna hear anything
Anything that's coming out of your mouth

I'm sure
I'm better without you
I'm sure
I'm better without you

I'm sure
I'm better without you
I'm better without you
I'm better off without you

Look at me
But I don't wanna…
You said to me,
But I don't wanna hear anything
Anything that's coming out of your mouth

I'm sure
I'm better without you
I'm sure
I'm better without you

I'm sure
I'm better without you
I'm better without you
I'm better off without you`,
  },
];

export const demos = [
  {
    slug: 'go-away',
    title: 'Go Away',
    type: 'Demo',
    audio: '/audio/go-away.mp3',
    lyrics: `Your big mouth say words that I don't want to hear
You keep saying that we don't belong in here

Sit tight, close your eyes, you don't want to see it
Pay attention baby, don't wanna mess with me
With me

I think right now it's time for you to go away
Go away
Don't try to change my mind I'll stay, I'll say
I will stay
You change so mutch, I'm gonna stay, not go away
Go away
Don't try to change my mind I'll stay, I'll say
I'll stay

It's getting hard, not to get
Lost, lost, lost
It's getting hard, not to get
Frost, frost, frost
Please don't make it harder
Than my thoughts
Thoughts

I think right now it's time for you to go away
Go away
Don't try to change my mind I'll stay, I'll say
I'll stay
You change so mutch, I'm gonna stay, not go away
Go away
Don't try to change my mind I'll stay, I'll say
I'll stay

It's getting hard, not to get
Lost, lost, lost
It's getting hard, not to get
Frost, frost, frost`,
  },
  {
    slug: 'weird-party',
    title: 'Weird Party',
    type: 'Demo',
    audio: '/audio/weird-party.mp3',
    lyrics: `I was sitted on the table
Waiting time to arrive
Emptying a bottle of
Of my ballentines

It's like gasoline
Give the fuel to me
And I see you, oh in a weird party

Weird Party
Where I am
Don't wanna be
Here with them

I was in the car
Waiting for my late driver
I ask him for a cigar
And he only came with a lighter
If that's what you see, when you trust a fool your dreams?
And what does god means when you don't get what you need

Weird party
Where I am
Don't wanna be
Here with them`,
  },
  {
    slug: 'anaphor',
    title: 'Anaphor',
    type: 'Demo',
    audio: '/audio/anaphor.mp3',
    lyrics: `After all, what do I have to do?
Why you called?
Who am I talking to?
I bet you were talking about me
About all those things that I'll never be

They called me at 2am and I
Didn't know what to say
And then try to stay awake
And keep my good behave

After all, what do I have to prove?
You say I'm wrong, but all mistakes belongs with you
I know you only took the easy way
You lied to me, raped me and now I won't ever hear what you want to say

They called me at 2am and I
Didn't know what to say
And then try to stay away
And keep my good behave
Good behave, good behave

They called me at 2am and I
Didn't know what to say
And then try to stay away
And keep my good behave`,
  },
  {
    slug: 'jed-n-warhol',
    title: 'Jed N Warhol',
    type: 'Demo',
    audio: '/audio/jed-n-warhol.mp3',
    lyrics: `Sometimes I was afraid to see
The tricks my mind was playing with me
Don't cry, they said "Don't be a bitch"
Just pass by, baby don't be a snitch
Oh darling, don't drop my bottle
Will you behave like this tomorrow?
Do you enjoy to watch me sorrow?
Will we be like Jed and Warhol?

I'm under the sea
What happened with me?

And my eyes they couldn't even see
All the patterns and shit you wrote to me
I'm on my way to find a woman that all can see
She told me I already made it, why can't you see?

I'm under the sea
What happened with me?`,
  },
  {
    slug: 'ydkhtba',
    title: 'YDKHTBA',
    type: 'Demo',
    audio: '/audio/ydkhtba.mp3',
    lyrics: `I think I got you, baby
But you don't know
You don't know how to be alone
You don't know
You don't know how to be alone

I bet I'm better on my own
Running running from my home
I knew this day would come
Yeah, now without you now I'm feeling home
You don't know how to be alone

And now that spring has come
I'm not feeling lonely no more
Yeah yeah yeah
But I bet that you are feeling some loneliness
For once in your life baby please once more
You don't know how to be alone

I bet I'm better on my own
Running running from my own
I knew this day would come
Now without you I'm feeling home
You don't know how to be alone
I bet I'm better on my own
Running running from my own
I knew this day would come
Now without you I'm feeling home
You don't know how to be alone`,
  },
  {
    slug: 'new-star',
    title: 'New Star',
    type: 'Demo',
    audio: '/audio/new-star.mp3',
    lyrics: `I've been kissed by a new star
Sweet, smart and pretty
That's what you are
Smilining and laughing
Movin upon my face
Should I try to resist?
Don't lose the time you should take

Since I got here
I knew from the start
People are never the way we think as they are
But when I'm with you there's something odd in my mind
Am I able to forgive?
You can't exist with no lies

Oooohhh…
Don't try to make me feel bad on this, honey
Oooohhh…
I can't even try to escape
This is my life
Oooohhh…
When I saying you're going
I hold you tight
Oooohhh…
When I'm screamin' I'm leaving
It ain't goodbye`,
  },
];



export const tracks = [...releases, ...ep1, ...demos];

export function trackBySlug(slug) {
  return tracks.find((track) => track.slug === slug);
}

// Estado da agenda em aberto. O ano vem de AGENDA_YEAR (lib/site.js).
export const agenda = {
  year: AGENDA_YEAR,
  status: `A agenda ${AGENDA_YEAR} está aberta.`,
  detail: 'Ainda sem datas confirmadas. ',
  upcoming: [],
};

// Já rolou — retrospectiva (2019–2024).
export const events = [
  {
    title: 'Festival Troque o Disco',
    note: 'Performance ao vivo na III edição do maior festival de música de Campos dos Goytacazes.',
  },
  {
    title: 'Weird Party 1–4',
    note: 'Série de noites da Garden: set ao vivo, DJs, exposição e casa lotada.',
  },
];

export const posters = [
  { src: posterFiles.weirdParty1, title: 'Weird Party 1' },
  { src: posterFiles.weirdParty2, title: 'Weird Party 2' },
  { src: posterFiles.weirdParty3, title: 'Weird Party 3' },
  { src: posterFiles.weirdParty4, title: 'Weird Xmas Party' },
];

export const gallery = liveGallery;

// Redes — usado na /contato e no footer. `key` casa com o ícone em SocialLinks.
export const socials = [
  {
    key: 'instagram',
    label: 'Instagram',
    handle: '@gardenpsychedelia',
    url: band.instagram,
  },
  {
    key: 'youtube',
    label: 'YouTube',
    handle: 'Garden Psychedelia',
    url: band.youtube,
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    handle: '@gardenpsyched',
    url: band.tiktok,
  },
  {
    key: 'spotify',
    label: 'Spotify',
    handle: 'Garden Psychedelia',
    url: band.spotify,
  },
];
