変換はこれ

```
ffmpeg -i 2022-06-11.wav -vn -ac 2 -ar 44100 -ab 256k -f mp4 output.m4a
ffmpeg -i output.m4a -c:v copy -c:a copy -f hls -hls_time 9 -hls_playlist_type vod -hls_segment_filename "audio%3d.ts" audio.m3u8
```

音声秒数の取得はこれ

```
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 output.m4a
```
