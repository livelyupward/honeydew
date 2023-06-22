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

  // function addNewItemToContent(newContentObj: HoneydewItem): void {
  //   spaceContent.value.push(newContentObj);
  // }

  async function getUser() {
    const userRequest = await fetch(`http://localhost:4000/users/dave@livelyupward.dev`);

    if (!userRequest.ok) throw new Error('Unable to retrieve user with email dave@livelyupward.dev');

    const userResponse = await userRequest.json();

    currentUser.value = userResponse;

    return { ...userResponse };
  }

  async function getUserSpaces() {
    const getSpacesRequest = await fetch(`http://localhost:4000/spaces`);
    const getSpaceResponse = await getSpacesRequest.json();

    if (!getSpacesRequest.ok) throw new Error('Unable to fetch user spaces.');

    userSpaces.value = [...getSpaceResponse];

    return getSpaceResponse;
  }

  async function createSpace(spaceTitle: string) {
    try {
      if (!currentUser.value) throw new Error('User not found. Cannot retrieve spaces without user.');
      const spaceCreateRequest = await fetch(`http://localhost:4000/spaces`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: spaceTitle, userId: currentUser.value._id }),
      });

      if (!spaceCreateRequest.ok) throw new Error('Create space fetch request failed');

      const spaceCreateResponse = await spaceCreateRequest.json();
      await getUserSpaces();

      return { ...spaceCreateResponse };
    } catch (error) {
      return { error };
    }
  }

  async function getSpaceAndContent(id: string | RouteParamValue[]) {
    try {
      const spaceRequest = await fetch(`http://localhost:4000/spaces/${id}`);
      if (!spaceRequest.ok) throw new Error('Unable to retrieve space with id of ' + id);
      const spaceResponse = await spaceRequest.json();

      const contentRequest = await fetch(`http://localhost:4000/content/${spaceResponse._id}`);
      if (!contentRequest.ok) throw new Error('Unable to retrieve content for space with id ' + spaceResponse._id);
      const contentResponse = await contentRequest.json();

      currentSpace.value = spaceResponse;
      spaceContent.value = contentResponse;

      return { space: spaceResponse, content: [contentResponse] };
    } catch (error) {
      return { error };
    }
  }

  async function createNewContentItem(contentObj: ContentItem) {
    try {
      console.log('obj: ', contentObj);
      const newContentItemRequest = await fetch(
        `http://localhost:4000/content${contentObj.spaceId ? `/?spaceid=${contentObj.spaceId}` : ''}`,
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

  async function setActiveSpace(spaceId: string | undefined) {
    if (userGetter.value === undefined)
      throw new Error('A user id was not provided, therefore a new active space could not be set.');
    try {
      const setActiveRequest = await fetch(`http://localhost:4000/users/active-space/${userGetter.value._id}`, {
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
  };
});

export interface State {
  userSpaces?: UserSpace[];
  spaceContent?: HoneydewItem[];
}

interface UserSpace {
  title: string;
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
  date?: Date;
  checked?: boolean;
  type: string;
  text: string;
  items?: string[];
  spaceId?: string;
  userId?: string;
}
