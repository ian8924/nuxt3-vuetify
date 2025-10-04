export default defineNuxtRouteMiddleware(async (to) => {
  const albumStore = useAlbumStore()
  const { ALBUM } = storeToRefs(albumStore)

  if (to.params.id && (!ALBUM.value || ALBUM.value.id !== Number(to.params.id))) {
    await albumStore.GET_ALBUM_INFO(Number(to.params.id))
  }
})
