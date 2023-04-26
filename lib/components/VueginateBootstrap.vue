<script setup lang="ts"></script>

<template>
  <!-- Bootstrap -->
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item disabled">
        <a class="page-link">&hellip;</a>
      </li>
      <li class="page-item"><a class="page-link" href="#">8</a></li>
      <li class="page-item"><a class="page-link" href="#">9</a></li>
      <li class="page-item active" aria-current="page">
        <span class="page-link">10</span>
      </li>
      <li class="page-item"><a class="page-link" href="#">11</a></li>
      <li class="page-item"><a class="page-link" href="#">12</a></li>
      <li class="page-item disabled">
        <span class="page-link">...</span>
      </li>
      <li class="page-item"><a class="page-link" href="#">20</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
