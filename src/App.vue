<template>
  <div id="snippet-stage">
    <h1>Heading</h1>
    <h2>Heading</h2>
    <h3>Heading</h3>
    <h4>Heading</h4>
    <h5>Heading</h5>
    <h6>Heading</h6>
    <hr />
    <p>Primary button</p>
    <button>Primary</button>
    <p>Secondary button</p>
    <button data-type="secondary">Secondary</button>
    <p>Hollow button</p>
    <button data-type="hollow">Hollow</button>
    <hr />
    <p>
      Lorem <a href="#">ipsum</a> dolor sit amet, consectetur adipisicing elit. Animi at deserunt enim exercitationem
      mollitia odio quod, quos suscipit veritatis voluptate! Accusamus animi assumenda enim fugiat porro quod vel vero
      voluptas!
    </p>
    <span>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur cumque ex impedit provident quod! Alias,
      aliquam consequuntur dolor dolorem doloribus dolorum fugit itaque iure iusto laborum, minima optio quaerat quidem.
    </span>
    <hr />
    <strong>strong lorem</strong>
    <em>strong lorem</em>
    <small>small text</small>
    <hr />
    <p>Styled lists</p>
    <ul data-type="decorated">
      <li>lorem</li>
      <li>ipsum</li>
      <li>dolar</li>
    </ul>
    <ol>
      <li>lorem</li>
      <li>ipsum</li>
      <li>dolar</li>
    </ol>
    <p>Utility list</p>
    <ul>
      <li>lorem</li>
      <li>ipsum</li>
      <li>dolar</li>
    </ul>
    <blockquote>hello world</blockquote>
    <hr />
    <div class="input-group">
      <label for="text">Text input</label>
      <input id="text" type="text" />
    </div>
    <div class="input-group">
      <label for="number">Number input</label>
      <input id="number" type="number" />
    </div>
    <div class="input-group">
      <label for="textarea">Long input</label>
      <textarea id="textarea" rows="5"></textarea>
    </div>
    <hr />
    <p>Dressed Headings</p>
    <h1 class="dressed">Dressed heading</h1>
    <h2 class="dressed">Dressed heading</h2>
    <h3 class="dressed">Dressed heading</h3>
    <h4 class="dressed">Dressed heading</h4>
    <h5 class="dressed">Dressed heading</h5>
    <h6 class="dressed">Dressed heading</h6>
  </div>
  <hr />
  <p>Checkable item</p>
  <Checkable>
    <p>How old is this crap?</p>
  </Checkable>
  <hr />
  <p>Card</p>
  <Card>
    <ul>
      <li>
        <Checkable> How old are you? </Checkable>
      </li>
      <li>
        <Checkable> Where is the meeting? </Checkable>
      </li>
      <li>
        <Checkable> Do you like the sandwich? </Checkable>
      </li>
    </ul>
  </Card>
  <p>Card with strikethrough</p>
  <Card>
    <template #header>Honeydew List</template>
    <ul>
      <li>
        <Checkable type="strike"> Do the dishes </Checkable>
      </li>
      <li>
        <Checkable> Mow the lawn </Checkable>
      </li>
      <li>
        <Checkable> Grab lunch before coming home </Checkable>
      </li>
    </ul>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkable from './components/Checkable.vue';
import Card from './components/Card.vue';

const good = ref(false);
</script>

<style lang="scss">
/*
Application colors
 */
$color1: #66c2a5;
$color2: #008cba;
$color3: #4c6e91;
$light-gray: #f7f7f7;
$medium-gray: #e1e1e1;
$dark-gray: #c2c2c2;
$black: #333;
$white: #fff;
$transparent: rgba(0, 0, 0, 0);

/*
Mixins
 */
@mixin shadow-sm {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.02), 1px 1px 2px rgba(0, 0, 0, 0.14);
}
@mixin main-border {
  border: 1.5px solid lighten($color3, 25);
  border-radius: 3px;
}
@mixin short-transition {
  transition: all 250ms ease-in;
}

/*
CSS Resets
 */
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
}
html,
body {
  counter-reset: order-list;
  margin: 0;
  padding: 0;
}
a,
abbr,
acronym,
address,
area,
article,
aside,
audio,
b,
bdi,
bdo,
blockquote,
button,
caption,
cite,
code,
data,
datalist,
dd,
del,
details,
dfn,
dialog,
dl,
dt,
em,
fieldset,
figcaption,
figure,
footer,
form,
header,
i,
iframe,
input,
ins,
kbd,
label,
legend,
li,
link,
main,
map,
mark,
ol,
optgroup,
option,
output,
p,
picture,
pre,
q,
s,
samp,
section,
select,
span,
strong,
sub,
summary,
sup,
table,
tbody,
td,
th,
template,
textarea,
thead,
time,
tr,
ul,
var {
  box-sizing: border-box;
  font-size: 1rem;
}

/*
Structural elements
 */
aside {
  padding: 1.375rem;
}
section {
  padding: 1.375rem;
  min-width: 300px;
}

/*
Headings
 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Carlito', sans-serif;
  margin: 0 0 0.875rem 0;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      background-color: $color3;
      content: '';
      display: block;
      height: 1rem;
      left: 0;
      position: absolute;
      top: 28%;
      width: 5px;
    }
  }
}
h1 {
  font-size: 3.5rem;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      height: 2.325rem;
    }
  }
}
h2 {
  font-size: 3rem;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      height: 2rem;
    }
  }
}
h3 {
  font-size: 2.5rem;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      height: 1.685rem;
    }
  }
}
h4 {
  font-size: 2rem;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      height: 1.275rem;
    }
  }
}
h5 {
  font-size: 1.5rem;
}
h6 {
  font-size: 1.125rem;

  &.dressed {
    padding-left: 1rem;
    position: relative;

    &::before {
      height: 0.75rem;
    }
  }
}

/*
Inline elements
 */
small {
  font-size: 0.75rem;
}
a {
  color: $color3;
  text-decoration: underline;
}

/*
Lists
 */
ul {
  list-style-type: none;
  margin: 0;
  padding: 0.875rem;
}
ul[data-type='decorated'] {
  list-style-type: none;
  padding-left: 0.875rem;
  li {
    position: relative;
    &::before {
      background-color: $color3;
      border-radius: 3px;
      content: '';
      display: block;
      height: 6px;
      left: -0.875rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
    }
  }
}
ol {
  list-style-type: none;
  padding-left: 0.875rem;
  li {
    position: relative;
    &::before {
      color: $color3;
      counter-increment: order-list;
      content: counter(order-list) '.';
      display: block;
      font-weight: 700;
      left: -1rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 6px;
    }
  }
}

/*
Buttons
 */
button {
  background-color: lighten($color3, 25%);
  cursor: pointer;
  padding: 0.15rem 0.525rem;
  @include main-border;
  @include shadow-sm;
  @include short-transition;

  &:hover {
    background-color: lighten($color3, 35%);
    @include short-transition;
  }

  &[data-type='secondary'] {
    background-color: $color1;
    border-color: $color1;
    @include short-transition;

    &:hover {
      background-color: lighten($color1, 15%);
      border-color: lighten($color1, 15%);
      @include short-transition;
    }
  }

  &[data-type='hollow'] {
    background-color: $transparent;

    &:hover {
      background-color: lighten($color3, 35%);
      @include short-transition;
    }
  }
}

/*
Form elements
 */
input {
  padding: 0.125rem 0.25rem;
  width: 100%;
  @include main-border;
  @include shadow-sm;
}
label {
  display: block;
}
textarea {
  resize: none;
  width: 100%;
  @include main-border;
  @include shadow-sm;
}
.input-group {
  flex-direction: column;
  margin: 0.875rem 0;
}

/*
Card component
 */
.honeydew-card {
  border: 1px solid lighten(#4c6e91, 25%);
  margin: 0.875rem;
  @include shadow-sm;
  @include main-border;

  .honeydew-card_header {
    background-color: $color3;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    padding: 0.375rem 0.875rem;

    h4 {
      color: #fff;
      font-size: 1.25rem;
      font-weight: 400;
      margin-bottom: 0;
    }
  }

  ul {
    padding-top: 0;
    padding-bottom: 0;

    li {
      padding: 0.875rem 0;

      &:first-of-type {
        margin-top: 0;
      }

      &:last-of-type {
        margin-bottom: 0;
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid #ddd;
      }
    }
  }
}
</style>
