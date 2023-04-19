const clientId = "67cd7989c7ea46a5b481072433e1dc67";
const clientSecret = "e5f56792687942498d7995afe3e8ec56";

// Encode the client ID and client secret to be used for authentication
const basicAuth = btoa(`${clientId}:${clientSecret}`);

async function getAccessToken() {
  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: "grant_type=client_credentials",
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(error);
  }
}

async function getTopSongsForGenre(genre) {
  try {
    const accessToken = await getAccessToken();
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=genre%3A${genre}&type=track&limit=50`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      const tracks = data.tracks.items;
      const topTracks = tracks
        .filter((track) => track.popularity > 70) // Filter tracks with popularity score greater than 70
        .sort((a, b) => b.popularity - a.popularity) // Sort tracks by popularity score in descending order
        .slice(0, 5) // Take the top 5 tracks
        .map((track) => track.name);
      return topTracks;
    } catch (error) {
      return [];
    }
  } catch (error) {
    console.error(error);
  }
}
async function getArtistList() {
  try {
    const accessToken = await getAccessToken();
    try {
      const response_1 = await fetch(
        "https://api.spotify.com/v1/search?q=genre%3Arock&type=artist&limit=50",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data_1 = await response_1.json();
      const artists = data_1.artists.items;
      const artistNames = artists.map((artist) => artist.name);
      return artistNames;
    } catch (error) {
      return [];
    }
  } catch (error_1) {
    return console.error(error_1);
  }
}

async function getSongsForArtist(artistName) {
  try {
    const accessToken = await getAccessToken();
    try {
      const response_1 = await fetch(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data_1 = await response_1.json();
      const artistId = data_1.artists.items[0].id;
      const response_2 = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data_2 = await response_2.json();
      const songs = data_2.tracks.slice(0, 5).map((track) => track.name);
      return songs;
    } catch (error) {
      return [];
    }
  } catch (error_1) {
    return console.error(error_1);
  }
}

$(function () {
  var INDEX = 0;
  $("#chat-submit").click(function (e) {
    e.preventDefault();
    var msg = $("#chat-input").val();
    if (msg.trim() == "") {
      return false;
    }
    generate_message(msg, "self");
    var buttons = [
      {
        name: "Existing User",
        value: "existing",
      },
      {
        name: "New User",
        value: "new",
      },
    ];
    setTimeout(function () {
      generate_message(msg, "user");
    }, 1000);
  });

  async function get_output(msg) {
    console.log(msg);
    const parts = msg.split(/\s+/);
    const search_term = parts.slice(1).join(" ");
    console.log("Search term is %s", search_term);
    if (msg.toLowerCase().includes("artist")) {
      console.log("Searching Songs based on Artist");
      const songList = await getSongsForArtist(search_term);
      return { type: "artist", name: search_term, data: songList };
    } else if (msg.toLowerCase().includes("genre")) {
      console.log("Searching songs based on Genre");
      const songList = await getTopSongsForGenre(search_term);
      return { type: "genre", name: search_term, data: songList };
    }
    return { type: "other", data: ["Sorry", "Excuse Me"] };
  }

  async function generate_message(msg, type) {
    INDEX++;
    var str = "";
    str += "<div id='cm-msg-" + INDEX + "' class=\"chat-msg " + type + '">';
    str += '          <span class="msg-avatar">';
    str += "          </span>";
    str += '          <div class="cm-msg-text">';
    if (type == "user") {
      const output = await get_output(msg);
      console.log(output);
      let outputList = "";
      if (output["type"] != "other") {
        if (output["type"] == "artist") {
          if (typeof output.data === "undefined" || output.data.length == 0) {
            str += `Looks like I was unable to find any songs for "${output["name"]}"<br>`;
          } else {
            str += `Here are some of the best songs from "${output["name"]}": <br>`;
          }
        } else {
          if (typeof output.data === "undefined" || output.data.length == 0) {
            str += `Hmmm, seems like I dont know about "${output["name"]}" genre<br>`;
          } else {
            str += `Enjoy top songs for "${output["name"]}" genre: <br>`;
          }
        }
        outputList = output.data
          .map((param, index) => `${index + 1}. ${param}`)
          .join("<br>");
      } else {
        outputList = output.data.join(", ");
      }
      str += outputList;
      console.log(outputList);
    } else {
      str += msg;
    }
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
      .hide()
      .fadeIn(300);
    if (type == "self") {
      $("#chat-input").val("");
    }
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
  }

  function generate_button_message(msg, buttons) {
    /* Buttons should be object array 
      [
        {
          name: 'Existing User',
          value: 'existing'
        },
        {
          name: 'New User',
          value: 'new'
        }
      ]
    */
    INDEX++;
    var btn_obj = buttons
      .map(function (button) {
        return (
          '              <li class="button"><a href="javascript:;" class="btn btn-primary chat-btn" chat-value="' +
          button.value +
          '">' +
          button.name +
          "</a></li>"
        );
      })
      .join("");
    var str = "";
    str += "<div id='cm-msg-" + INDEX + '\' class="chat-msg user">';
    str += '          <span class="msg-avatar">';
    str +=
      '            <img src="https://image.crisp.im/avatar/operator/196af8cc-f6ad-4ef7-afd1-c45d5231387c/240/?1483361727745">';
    str += "          </span>";
    str += '          <div class="cm-msg-text">';
    str += msg;
    str += "          </div>";
    str += '          <div class="cm-msg-button">';
    str += "            <ul>";
    str += btn_obj;
    str += "            </ul>";
    str += "          </div>";
    str += "        </div>";
    $(".chat-logs").append(str);
    $("#cm-msg-" + INDEX)
      .hide()
      .fadeIn(300);
    $(".chat-logs")
      .stop()
      .animate({ scrollTop: $(".chat-logs")[0].scrollHeight }, 1000);
    $("#chat-input").attr("disabled", true);
  }

  $(document).delegate(".chat-btn", "click", function () {
    var value = $(this).attr("chat-value");
    var name = $(this).html();
    $("#chat-input").attr("disabled", false);
    generate_message(name, "self");
  });
  $("#chat-link").click(function () {
    $("#chat-circle").trigger("click");
  });

  $("#chat-circle").click(function () {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  });

  $(".chat-box-toggle").click(function () {
    $("#chat-circle").toggle("scale");
    $(".chat-box").toggle("scale");
  });
});