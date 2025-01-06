<script setup></script>
<template>
    <layout>
        <h1 align="center">css线性过度</h1>
        <div class="box-content">
            <div class="linear-gradient box1"></div>
            <div class="linear-gradient box2"></div>
            <div class="linear-gradient box3"></div>
            <div class="linear-gradient box4"></div>
            <div class="linear-gradient box5"></div>
            <div class="linear-gradient box6"></div>
        </div>
    </layout>
</template>
<style scoped>
.box-content {
    background-color: #f5f5f5;
}

.linear-gradient {
    width: 200px;
    height: 150px;
    display: inline-block;
    margin: 10px;
}

.box1 {
    background: linear-gradient(red 10%, blue 90%);
}

.box2 {
    background: linear-gradient(#e66465, #9198e5);
}

.box3 {
    background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c);
}

.box4 {
    background: linear-gradient(217deg, rgba(255, 0, 0, .8), rgba(255, 0, 0, 0) 70.71%),
        linear-gradient(127deg, rgba(0, 255, 0, .8), rgba(0, 255, 0, 0) 70.71%),
        linear-gradient(336deg, rgba(0, 0, 255, .8), rgba(0, 0, 255, 0) 70.71%);
}

.box5 {
    background:
        linear-gradient(180deg,
            transparent 40%,
            white 40% 60%,
            transparent 60%),
        linear-gradient(90deg,
            transparent 40%,
            white 40% 60%,
            transparent 60%),
        linear-gradient(45deg,
            transparent 43%,
            white 43% 57%,
            transparent 57%),
        linear-gradient(135deg,
            transparent 43%,
            white 43% 57%,
            transparent 57%);
}

.box6 {
    background: linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%);
}
</style>