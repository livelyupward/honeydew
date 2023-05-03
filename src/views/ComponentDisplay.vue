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

<script setup>
import Checkable from '../components/Checkable.vue';
import Card from '../components/Card.vue';
</script>

<style scoped></style>
