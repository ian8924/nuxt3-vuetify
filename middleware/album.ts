export default defineNuxtRouteMiddleware(async (to) => {
  const albumStore = useAlbumStore()
  const { ALBUM } = storeToRefs(albumStore)

  if (to.params.albumID && (!ALBUM.value || ALBUM.value.id !== Number(to.params.albumID))) {
    await albumStore.GET_ALBUM_INFO(Number(to.params.albumID))
  }
})
