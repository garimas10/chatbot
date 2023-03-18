const player = document.getElementById("player");
const audio = document.getElementById("audio");
const playPause = document.getElementById("play-pause");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const playlist = document.getElementById("songs");
const progressBar = document.getElementById("progress-bar");
const progress = document.querySelector(".progress");
const currentTime = document.querySelector("#current-time");
const duration = document.querySelector("#duration");
const cards = document.querySelectorAll(".card-flyer");
const modal = document.querySelector("#exampleModal");

const songs_by_playlist = {
  pop: [
    {
      song_name: "Tutu Remix - Camilo Ft. Shakira, Pedro Capó",
      song_link:
        "https://www.playurbanomp3.com/Albums/2020/Camilo%20-%20Por%20Primera%20Vez%202020/10%20-%20Camilo,%20Shakira,%20Pedro%20Cap%c3%b3%20-%20Tutu%20-%20Remix.mp3",
    },
    {
      song_name: "Blinding Lights - The Weeknd",
      song_link: "https://pagalworld.nl/files/download/id/26673",
    },
    {
      song_name:
        "Sunflower (Spider-Man: Into the Spider-Verse) - Post Malone, Swae Lee",
      song_link: "https://pagalworld.nl/files/download/type/320/id/29996",
    },
    {
      song_name: "Justin Bieber – Ft Giveon & Daniel Caesar - Peaches",
      song_link: "https://hiphopkit.com/music/download/15725/",
    },
    {
      song_name: "Angelito Vuela - Don Omar",
      song_link:
        "https://www.playurbanomp3.com/Canciones/Don%20Omar/Don%20Omar%20-%20Luna%20(WwW.PlayUrbano.Com).mp3",
    },
    {
      song_name: "Lil Nas X - Old Town Road",
      song_link:
        "https://files.gospeljingle.com/uploads/music/2023/01/Lil_Nas_X_ft_Billy_Ray_Cyrus_-_Old_Town_Road.mp3",
    },
    {
      song_name: "No Tears Left To Cry - Ariana Grande",
      song_link: "https://pagolworld.nl/files/download/id/502",
    },
    {
      song_name: "Circles - Post Malone",
      song_link: "https://pagalworld.nl/files/download/type/320/id/29997",
    },
  ],
  rock: [
    {
      song_name: "Linkin Park - In the End",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SWtZN3NwZGtiS3hRWUtSTmptM2I4RzVkSnBXeThRMUVJbitrTExaaXdnTEE9/Linkin_Park_-_In_the_End_(ColdMP3.com).mp3",
    },
    {
      song_name: "Evanescence - Bring me to life",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVU1M3ZpQ3BHOXRvZ3ZmR21LZmE2TE90NzB3UWlVb2E2NzAvMHhGanhzRGc9/Evanescence_-_Bring_Me_To_Life_(ColdMP3.com).mp3",
    },
    {
      song_name: "Breaking Benjamin - The Diary of Jane ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SUlGYTNhY2thdE5wTDRzK0NPVXNLYnZySXV6Q2NYaVNyZCtJVGJrbEwxOTQ9/Breaking_Benjamin_-_The_Diary_of_Jane_(ColdMP3.com).mp3",
    },
    {
      song_name: " The Killers - Mr. Brightside ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SU5FYjNtdW5ZUlhTTkZoS1dwOTIwKzNNNEF5cjJ2dFZ0aDFROWFGSXpzWXc9/The_Killers_-_Mr._Brightside_(ColdMP3.com).mp3",
    },
    {
      song_name: " Nirvana Come - As You Are ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SU4zcEJYTUVvV3pVZk1DYm1jd093NjBkSDVKY2hEbTllSEFXSVNXbVpvdmc9/Nirvana_-_Come_As_You_Are_(ColdMP3.com).mp3",
    },
    {
      song_name: " Coldplay - Yellow ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVVtcEx0cHhYcGMzSEJyWlp5NDY2M1JvUVoyRm4xMHVZQ3JaV05xMmN5ZHc9/Coldplay_-_Yellow_(ColdMP3.com).mp3",
    },
    {
      song_name: "Guns N' Roses - Sweet Child O' Mine",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SStCYXRVb3UwVHMwU0tmMHFuTDM2b01XdThxb3ZxaGc4TUQ5ajdLNGo2STQ9/Guns_N_Roses_-_Sweet_Child_O_Mine_Album_Version_Album_Version_(ColdMP3.com).mp3",
    },
    {
      song_name: "Queen - Bohemian Rhapsody",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SWxiald6NERNYkN0TVdnK3B2bnJUVjByNWRtWWhOdmpCemR3blFNTzBkQ009/Queen_-_Bohemian_Rhapsody_Remastered_2011_Remastered_2011_(ColdMP3.com).mp3",
    },
  ],
  "hip-hop": [
    {
      song_name: " Drake - Best I Ever Had ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVFXZGZXYnpGOGZxVjBnT25MSzZONFJiTTdudzRwZzZVcTF1MHRzamVPSDg9/Drake_-_Best_I_Ever_Had_(ColdMP3.com).mp3",
    },
    {
      song_name: "Dr. Dre feat. Snoop Dogg -  Still D.R.E. ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SWorZkREUGZUNXcvS2Z5amd3SSs2MG9ZNGUxNUF6MVdUcEtJdDlURFRhZE09/Dr._Dre_feat._Snoop_Dogg_-_Still_D.R.E._Album_Version_Edited_Album_Version_Edited_(ColdMP3.com).mp3",
    },
    {
      song_name: " Lil Wayne feat. Static Major - Lollipop",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0STRPUk5EOWhleTR3dU9LbkFUcWNpOVNqb24zQWZsVHBGK0R6d3RUV3ZTYkk9/Lil_Wayne_feat._Static_Major_-_Lollipop_(ColdMP3.com).mp3",
    },
    {
      song_name: "Eminem - Lose Yourself (From '8 Mile' Soundtrack)",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SW9UbmpaV3lPS2RUYlBhVFcxT294WUdIOFRtRDk1OW9zL1M5NTAxMldnU1U9/Eminem_-_Lose_Yourself_From_8_Mile_Soundtrack_From_8_Mile_Soundtrack_(ColdMP3.com).mp3",
    },
    {
      song_name: " Snoop Dogg - Drop It Like It's Hot ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0STVvTTVtc3pkdWc5NjdXdEw5YjhCaFN0VzBSVEhoZC9kM0JZSnRrazJwMEk9/Snoop_Dogg_-_Drop_It_Like_It_s_Hot_(ColdMP3.com).mp3",
    },
    {
      song_name: "Kanye West - Heartless",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SXFleEtBM1JKN1lZbVpSRGxQNURBZmU4MEZXMjA4R1VHUEpIK2FBYUZCalU9/Kanye_West_-_Heartless_Album_Version_Album_Version_(ColdMP3.com).mp3",
    },
    {
      song_name: " The Game feat. 50 Cent - Hate It Or Love It",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVQ0S2lVNlFKcGw1WGhpT25CdXNUR2R3ZjJjY0JPODBRbWEyTHpyRnBkUVE9/The_Game_feat._50_Cent_-_Hate_It_Or_Love_It_(ColdMP3.com).mp3",
    },
    {
      song_name: " Eminem - Love The Way You Lie ",
      song_link:
        "hhttps://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SURHVFUzckozYm1YU3hBTU5Gd3lLdXg0UGpMMGRGQzBucHBKcWYraDRoTmM9/Eminem_-_Love_The_Way_You_Lie_(ColdMP3.com).mp3",
    },
  ],
  "heavy metal": [
    {
      song_name: "Slayer - Raining Blood ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SS9KNGwyK3U2MURmMFJCYkNnK01EWkJkendTMG9SbEZYRzQ5MGdCUVEvMUE9/Slayer_-_Raining_Blood_Album_Version_Album_Version_(ColdMP3.com).mp3",
    },
    {
      song_name:
        " Jay-Z, Linkin Park - Dirt off Your Shoulder / Lying from You ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0STlqOENJaG5mTE9lSXpVRWUxenVTblJhMXE5RTc2ZHZwY2psSXVuczVuaXc9/Jay-Z_Linkin_Park_-_Dirt_off_Your_Shoulder_Lying_from_You_(ColdMP3.com).mp3",
    },
    {
      song_name: "Metallica -  Battery",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SU5FYjNtdW5ZUlhTTkZoS1dwOTIwK3haTHlQQnBvYXd1KzRteGgremtxYTA9/Metallica_-_Battery_Remastered_Remastered_(ColdMP3.com).mp3",
    },
    {
      song_name: " Avenged Sevenfold - Almost Easy ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVVtcEx0cHhYcGMzSEJyWlp5NDY2M2VkSlNzalV1OGRxZU43ZkJNRGNRcmc9/Avenged_Sevenfold_-_Almost_Easy_(ColdMP3.com).mp3",
    },
    {
      song_name: " Def Leppard - Pour Some Sugar On Me ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SWRkVDdpMXhua055VzU5bDloM0JnUk1QandTdUU3YmpJRThDTW5QSlRhZ1U9/Def_Leppard_-_Pour_Some_Sugar_On_Me_(ColdMP3.com).mp3",
    },
    {
      song_name: " Alice Cooper - Poison ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SXAxb1RqeGY4SEE4aTc1Ukg2M1ZES0gxdU9PTlNqQ05SV2tWNGhaTm9zbG89/Alice_Cooper_-_Poison_(ColdMP3.com).mp3",
    },
    {
      song_name: "System Of A Down - Psycho ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SXFleEtBM1JKN1lZbVpSRGxQNURBZlZnNDlvTE9uVWU3Q0FKL0VYYTdJaG89/System_Of_A_Down_-_Psycho_(ColdMP3.com).mp3",
    },
    {
      song_name: "Marilyn Manson - Sweet Dreams (Are Made Of This)",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVU1M3ZpQ3BHOXRvZ3ZmR21LZmE2TEtCaVRTMzlvdDVPTHRyN0JqckRJWG89/Marilyn_Manson_-_Sweet_Dreams_Are_Made_Of_This_(ColdMP3.com).mp3",
    },
  ],
  "indian hip-hop": [
    {
      song_name: "AP Dhillon, Gurinder Gill, Shinda Kahlon - Brown Munde",
      song_link: "https://paglasongs.com/files/download/type/320/id/2977",
    },
    {
      song_name: "Emiway Bantai X Prznt - Listen Lonely",
      song_link: "https://djsongi.com/files/download/id/16268",
    },
    {
      song_name: "Ashish Bhatia -  Listen Bhai Tera Zeher",
      song_link: "https://djsongi.com/files/download/id/16266",
    },
    {
      song_name: "King - Listen IIconic",
      song_link: "https://djsongi.com/files/download/id/16275",
    },
    {
      song_name: "Krsna - Listen Say My Name",
      song_link: "https://djsongi.com/files/download/id/16633",
    },
    {
      song_name: "M Zee Bella - Listen Laapata",
      song_link: "https://djsongi.com/files/download/id/16257",
    },
    {
      song_name: "Karma X Raftaar - Listen Baba Yaga ",
      song_link: "https://djsongi.com/files/download/id/16264",
    },
    {
      song_name: "AP Dhillon - Summer High",
      song_link:
        "https://cdnsongs.com/dren/music/data/Single_Track/202208/Summer_High/320/Summer_High_1.mp3/Summer%20High.mp3",
    },
  ],
  "indian-pop": [
    {
      song_name: "Arijit Singh - Bairiya",
      song_link: "https://mastinew.com/files/download/type/128/id/21073",
    },
    {
      song_name: "Vishal Mishra - Aaj Bhi",
      song_link:
        "https://cdn.pagalworld.us/songs/new/192/Aaj%20Bhi%20-%20Vishal%20Mishra.mp3",
    },
    {
      song_name: "AP Dhillon - Insane",
      song_link:
        "https://pwdown.info/113515/variation/190K/Insane%20-%20AP%20Dhillon.mp3",
    },
    {
      song_name: "Guru Randhawa - Lahore",
      song_link: "https://pagalnew.com/download128/4170",
    },
    {
      song_name: "Arijit Singh - Tujhe Kitna Chahne lage",
      song_link:
        "https://pagalsong.in/download/9520/Tujhe%20Kitna%20Chahne%20Lage%20128%20KBPS%20mp3",
    },
    {
      song_name: "Sonu Nigam, Shreya Ghosal - Main Agar Kahoon",
      song_link:
        "https://pagalsong.in/download/39752/Main%20Agar%20Kahoon%20128%20KBPS%20mp3",
    },
    {
      song_name: "Atif Aslam, Alisha Chinai, Pritam - Tera Hone Laga Hoon",
      song_link: "https://pagalnew.com/download128/8492",
    },
    {
      song_name: "Mohit Chauhan - Tune Jo na Kaha",
      song_link:
        "https://pagalsong.in/download/37845/Tune%20Jo%20Na%20Kaha%20128%20KBPS%20mp3",
    },
  ],
  romantic: [
    {
      song_name: "Ed Sheeran - Perfect",
      song_link:
        "https://geckofeeds.com/wp-content/uploads/2022/07/Ed_Sheeran_-_Perfect.mp3",
    },
    {
      song_name: "John Legend - All of me",
      song_link:
        "https://luvmp.com/wp-content/uploads/2022/04/John_Legend_-_All_of_Me_Luvmp.Com_.mp3",
    },
    {
      song_name: "Bruno Mars - Just The Way You Are",
      song_link:
        "https://files.gospeljingle.com/uploads/music/2023/01/Bruno_Mars_-_Just_the_Way_You_Are.mp3",
    },
    {
      song_name: "Justin Timberlake - Mirrors",
      song_link:
        "https://mariannefeder.com/wp-content/uploads/2020/12/Justin_Timberlake_-_Mirrors.mp3",
    },
    {
      song_name: "James Arthur - Say You Wont Let Go",
      song_link:
        "https://thinknews.com.ng/wp-content/uploads/2022/05/James_Arthur_Say_You_Wont_Let_Go_(thinkNews.com.ng).mp3",
    },
    {
      song_name: "Christina Perri - A Thousand Years",
      song_link: "https://pagalworldi.com/files/download/id/2972",
    },
    {
      song_name: "Justin Bieber - Anyone",
      song_link: "https://paglasongs.com/files/download/type/192/id/6206",
    },
    {
      song_name: "Ariana Grande - POV",
      song_link:
        "https://thinknews.com.ng/wp-content/uploads/2022/05/Ariana_Grande_Pov_(thinkNews.com.ng).mp3",
    },
  ],
  country: [
    {
      song_name: "Reba McEntire – Fancy",
      song_link:
        "https://naijaremix.net/wp-content/uploads/2022/07/Reba_McEntire_-_Fancy_Naijaremix.mp3",
    },
    {
      song_name: "Maroon5 - Memories",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SUx1ZGd1OWtkSTIvTysxQXY5dldGWXVwMU5pRnB5YW1sVjNMRlp6UGJ4U2c9/Maroon_5_-_Memories_(ColdMP3.com).mp3",
    },
    {
      song_name: "Miley Cyrus - The Climb",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SVQ0S2lVNlFKcGw1WGhpT25CdXNUR2RxcHhMQzhRSTYxZzFYMjd4cjZRZk09/Miley_Cyrus_-_The_Climb_(ColdMP3.com).mp3",
    },
    {
      song_name: " Taylor Swift - Love Story",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0STMrdWZVNldOUUFQckFjMkh1OURiOHFGMWZxcGlGVVRyc2haOXpBWmhLUm89/Taylor_Swift_-_Love_Story_(ColdMP3.com).mp3",
    },
    {
      song_name: " Ricky Nelson - Lonesome Town ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SXN5SXVzZDlNazA4U3N5TklGcGsvMHJUSTROR2l2R2NlTlhUN01ndElqaDg9/Ricky_Nelson_-_Lonesome_Town_(ColdMP3.com).mp3",
    },
    {
      song_name: " Johnny Cash - Cocaine Blues ",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SXN5SXVzZDlNazA4U3N5TklGcGsvMHN2Y2p3U3psQ0xtZXhNVXAvWEUvR2M9/Johnny_Cash_-_Cocaine_Blues_(ColdMP3.com).mp3",
    },
    {
      song_name: "Lady Gaga, Bradley Cooper - Shallow",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SWNqMEcyNVpuWVZJYWFENzBDNTZFUnBCRktkalBycjlzMUFkVUdXUy9mUGM9/Lady_Gaga_Bradley_Cooper_-_Shallow_Radio_Edit_Radio_Edit_(ColdMP3.com).mp3",
    },
    {
      song_name: "The Band Perry - If I Die Young",
      song_link:
        "https://fine.sunproxy.net/file/dWtKaURySXpaTWhOY0lEcjhTQkZHek9tQUVJNTBGMUJLMUxucy9GTmxMbC9BRG9CK2VQcGQwQU0yTDBPcVF0SUJ2N3gzZUVQMEU1OUtrNXJ2N21MelZpR0RRNnRndXJQYTlOK3VTRkRNRXc9/The_Band_Perry_-_If_I_Die_Young_Radio_Version_Radio_Version_(ColdMP3.com).mp3",
    },
  ],
};

let currentSong = 0;

// Loop through each card and add a click event listener
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    currentSong = 0;
    currentTime.textContent = "0:00";
    duration.textContent = "0:00";
    progress.style.width = "0%";
    playlist.innerHTML = "";
    console.log(card);
    const get_genre_name = card.querySelector("h6").innerHTML;
    console.log(get_genre_name.toLowerCase());
    const get_song_info_genre = songs_by_playlist[get_genre_name.toLowerCase()];
    console.log(get_song_info_genre);
    var flag = true;
    get_song_info_genre.forEach((song) => {
      // Create a new li element with data-src attribute and text content
      const li = document.createElement("li");
      li.setAttribute("data-src", song["song_link"]);
      li.textContent = song["song_name"];
      if (flag) {
        li.classList.add("active-song");
        flag = false;
      }
      // Append the new li element to the ul element
      playlist.appendChild(li);
    });
  });
});

modal.addEventListener("hidden.bs.modal", function () {
  audio.pause();
});

playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    currentSong = Array.from(playlist.children).indexOf(e.target);
    audio.src = e.target.getAttribute("data-src");
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
    audio.play();
    setActiveSong(currentSong);
  }
});

playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
  } else {
    audio.pause();
    playPause.innerHTML = '<i class="bi bi-play-fill"></i>';
  }
});

prev.addEventListener("click", () => {
  currentSong--;
  if (currentSong < 0) {
    currentSong = playlist.children.length - 1;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

next.addEventListener("click", () => {
  currentSong++;
  if (currentSong === playlist.children.length) {
    currentSong = 0;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

// volume.addEventListener("input", (e) => {
//   audio.volume = e.target.value;
// });

audio.addEventListener("timeupdate", (e) => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTime.textContent = formatTime(audio.currentTime);
  duration.textContent = formatTime(audio.duration);
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Seek audio when progress bar is clicked
progressBar.addEventListener("click", (e) => {
  const percent = e.offsetX / progressBar.offsetWidth;
  audio.currentTime = percent * audio.duration;
});

// Update progress bar as audio plays
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${percent}%`;
  currentTime.innerHTML = formatTime(audio.currentTime);
});

audio.addEventListener("ended", (e) => {
  if (currentSong === playlist.children.length - 1) {
    currentSong = 0;
  } else {
    currentSong++;
  }
  audio.src = playlist.children[currentSong].getAttribute("data-src");
  audio.play();
  setActiveSong(currentSong);
});

const setActiveSong = (index) => {
  // remove "active" class from previously active song
  // console.log("active song", playlist.querySelector(".active-song"));
  playlist.querySelector(".active-song").classList.remove("active-song");

  // add "active" class to currently playing song
  const activeSong = playlist.querySelectorAll("li")[index];
  console.log(activeSong);
  activeSong.classList.add("active-song");
};