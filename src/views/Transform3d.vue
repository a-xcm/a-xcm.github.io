<script setup></script>
<template>
    <layout>
        <div class="card">
            <div class="box">
                <div class="fill">
                </div>
            </div>
            <p>transform</p>
        </div>
    </layout>
</template>
<style scoped>
.card {
    margin: 10px;
    background: #fff;
    width: 200px;
    padding: 30px;
    box-shadow: 0 3px 5px #ddd;
}

.card p {
    padding: 25px 0 0;
    text-align: center
}

.box {
    width: 100px;
    height: 100px;
    margin: auto;
    background: #ddd;
    cursor: pointer;
    box-shadow: 0 0 5px #ccc inset;
    perspective: 100px;
}

.card .box .fill {
    width: 100px;
    height: 100px;
    position: relative;
    background: #03A9F4;
    opacity: .5;
    box-shadow: 0 0 5px #ccc;
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.card .box:hover .fill {
    /* transform: rotate(45deg); */
    /* transform: rotateX(45deg); */
    /* transform: rotateY(45deg); */
    /* transform: rotateZ(45deg); */
    /* transform: scale(2); */
    /* transform: scaleX(2); */
    /* transform: scaleY(2); */
    /* transform: skew(45deg,45deg); */
    transform: rotateX(45deg);


}
</style>