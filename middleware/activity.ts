export default defineNuxtRouteMiddleware(async (to) => {
  const activityStore = useActivityStore()
  const { ACTIVITY } = storeToRefs(activityStore)

  if (to.params.eventID && (!ACTIVITY.value || ACTIVITY.value.eventId !== to.params.eventID)) {
    await activityStore.GET_ACTIVITY_INFO(to.params.eventID as string)
  }
})
