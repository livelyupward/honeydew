import { defineStore } from 'pinia';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { RouteParamValue } from 'vue-router';

export const mainStore = defineStore('main', () => {
  const currentUser: Ref<User | undefined> = ref();
  const userSpaces: Ref<UserSpace[] | undefined> = ref();
  const currentSpace: Ref<UserSpace | undefined> = ref();
  const spaceContent: Ref<any | undefined> = ref();

  const userGetter: ComputedRef<User | undefined> = computed(() => currentUser.value);

  const userSpacesGetter: ComputedRef<UserSpace[] | undefined> = computed(() => userSpaces.value);

  const getCurrentSpace = computed(() => currentSpace.value);

  const getSpaceContent: ComputedRef<any> = computed(() => {
    return { space: spaceContent.value, content: spaceContent.value };
  });

  async function getUser() {
    const userRequest = await fetch(`/api/users/dave@livelyupward.dev`);

    if (!userRequest.ok) throw new Error('Unable to retrieve user with email dave@livelyupward.dev');

    const userResponse = await userRequest.json();

    currentUser.value = userResponse;

    return { ...userResponse };
  }

  async function getUserSpaces() {
    const getSpacesRequest = await fetch(`/api/spaces`);
    const getSpaceResponse = await getSpacesRequest.json();

    if (!getSpacesRequest.ok) throw new Error('Unable to fetch user spaces.');

    userSpaces.value = [...getSpaceResponse];

    return getSpaceResponse;
  }

  async function createSpace(spaceTitle: string) {
    try {
      if (!currentUser.value) throw new Error('User not found. Cannot retrieve spaces without user.');
      const spaceCreateRequest = await fetch(`/api/spaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: spaceTitle, userId: currentUser.value._id }),
      });

      if (!spaceCreateRequest.ok) throw new Error('Create space fetch request failed');

      const spaceCreateResponse = await spaceCreateRequest.json();
      await getUserSpaces();

      return spaceCreateResponse;
    } catch (error) {
      return { error };
    }
  }

  async function getSpaceAndContent(id: string | RouteParamValue[]) {
    try {
      const spaceRequest = await fetch(`/api/spaces/${id}?content=yes`);
      if (!spaceRequest.ok) throw new Error('Unable to retrieve space with id of ' + id);
      const spaceResponse = await spaceRequest.json();

      currentSpace.value = spaceResponse;
      spaceContent.value = spaceResponse.content;

      return spaceResponse;
    } catch (error) {
      return { error };
    }
  }

  async function createNewContentItem(contentObj: ContentItem) {
    try {
      console.log('obj: ', contentObj);
      const newContentItemRequest = await fetch(
        `/api/content${contentObj.spaceId ? `?spaceid=${contentObj.spaceId}` : ''}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contentObj),
        }
      );
      if (!newContentItemRequest.ok) throw new Error('Error creating new content item.');
      const newContentItemResponse = await newContentItemRequest.json();

      spaceContent.value.push(newContentItemResponse.contentItem);

      return newContentItemResponse;
    } catch (error) {
      return { error };
    }
  }

  async function addContentToSpace(contentObj: ContentItem) {
    let alteredContent = getCurrentSpace.value ? getCurrentSpace.value.content : null;

    if (!contentObj._id || !getCurrentSpace.value)
      throw new Error('Content object ID or Space is unavailable. Please try again or contact a developer.');

    console.log('currentSpace: ', getCurrentSpace.value);
    console.log('contentObj: ', contentObj);
    if (alteredContent === null)
      throw new Error('Content was not able to be retrieved before adding to its current space. Please contact a dev.');
    alteredContent.push(contentObj._id);
    console.log('altered: ', alteredContent);
    const dataToSubmit = { ...getCurrentSpace.value, content: alteredContent };

    const spaceRequest = await fetch(`/api/spaces${currentSpace.value ? `/${currentSpace.value._id}` : ``}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    });
    if (!spaceRequest.ok) throw new Error("Content item's space was not found. Please try again.");
    const spaceResponse = await spaceRequest.json();

    return spaceResponse;
  }

  async function setActiveSpace(spaceId: string | undefined) {
    if (userGetter.value === undefined)
      throw new Error('A user id was not provided, therefore a new active space could not be set.');
    try {
      const setActiveRequest = await fetch(`/api/users/active-space/${userGetter.value._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spaceId }),
      });
      if (!setActiveRequest.ok) throw new Error("Unable to set the user's new space");
      const setActiveResponse = await setActiveRequest.json();

      return setActiveResponse;
    } catch (error) {}
  }

  async function submitCurrentSpaceContent(contentArray: string[]) {
    console.log(contentArray);
    if (!getCurrentSpace.value)
      throw new Error('Space is undefined. A space is required to complete this action. Please try again.');
    // get current space id
    const spaceId = getCurrentSpace.value._id;
    // make content id array equal to the array being passed
    const spaceWithNewContentRequest = await fetch(`/api/spaces/${spaceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contentArray),
    });
    if (!spaceWithNewContentRequest.ok)
      throw new Error('Space content could not be saved. Please try again or contact a developer.');
    const spaceWithNewContentResponse = spaceWithNewContentRequest.json();

    return spaceWithNewContentResponse;
  }

  return {
    currentUser,
    userSpaces,
    spaceContent,
    getSpaceContent,
    userSpacesGetter,
    userGetter,
    getUser,
    getUserSpaces,
    getCurrentSpace,
    createSpace,
    getSpaceAndContent,
    createNewContentItem,
    setActiveSpace,
    submitCurrentSpaceContent,
    addContentToSpace,
  };
});

export interface State {
  userSpaces?: UserSpace[];
  spaceContent?: HoneydewItem[];
}

interface UserSpace {
  _id: number;
  title: string;
  content: string[];
}

export interface HoneydewItem {
  type: string;
  text: string;
  items?: [] | object;
}

interface User {
  _id: string;
  name: string;
  email: string;
  activeSpace?: string;
}

interface ContentItem {
  _id?: string;
  date?: Date;
  checked?: boolean;
  type: string;
  text: string;
  items?: string[];
  spaceId?: string;
  userId?: string;
}
