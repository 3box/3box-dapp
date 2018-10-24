export const timeSince = (date) => {
    var seconds = Math.floor(((new Date().getTime()/1000) - date/1000)),
    interval = Math.floor(seconds / 31536000);
    
    if (interval > 1) return interval + " years ago";
    
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + " months ago";
    interval = Math.floor(seconds / 2592000);
    if (interval === 1) return interval + " month ago";
    
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return interval + " days ago";
    interval = Math.floor(seconds / 86400);
    if (interval === 1) return interval + " day ago";
    
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return interval + " hours ago";
    interval = Math.floor(seconds / 3600);
    if (interval === 1) return interval + " hour ago";
    
    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + " minutes ago";
    interval = Math.floor(seconds / 60);
    if (interval === 1) return interval + " minute ago";
    
    return Math.floor(seconds) + " seconds ago";
  }