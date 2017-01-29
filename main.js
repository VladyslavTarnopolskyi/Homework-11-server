$(document).ready(function () {
    var todoList = $('#todo-list');

    $(document).on('click', '.del-item', deleteItem);
    $(document).on('click', '.text-todo', selectItem);
    $(document).on('click', '.edit-item', editItem);

    $('#add-press').on('click', function () {
        var addItem = $('#todo-enter').val();
        if(addItem !== '') {
            todoList.prepend('<li class="box">' + '<span class="text-todo">' + addItem + '</span>'
                + '<button class="del-item waves-effect waves-light btn">X</button>'
                + '<button class="edit-item waves-effect waves-light btn">Edit</button>'
                + '</li>');
            $('#todo-enter').val('');

        }else {
            alert('write something');
        }
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: '/api/v1/todo',
            data: JSON.stringify({ "todo": {"item": addItem}}),
            dataType: 'json',
            processData: false,
            success: function () {
                console.log("success POST");
            }
        });
        counter();
    });

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/api/v1/todo',
        success: function (data) {
            for(var i = 0; i < data.length; i++){
                todoList.prepend('<li class="box">' + '<span class="text-todo">'  + data[i].item + '</span>'
                    + '<button class="del-item waves-effect waves-light btn">X</button>'
                    + '<button class="edit-item waves-effect waves-light btn">Edit</button>'
                    + '</li>');
                console.log("success GET");
            }
            console.log(data);
        }
    });

    $('#todo-enter').keyup(function(e){
        if (e.keyCode === 13) {
            $('#add-press').click();
        }
    });
    function selectItem() {
        $(this).toggleClass("checked");
        counter();
    }

    function deleteItem(e) {
        let texts = $(e.target).siblings('span').text();
        console.log(texts);
        $.ajax({
            type: 'DELETE',
            contentType: 'application/json',
            url: '/api/v1/todo/' + texts,
            success: function(){
                console.log("success DELETE");
            }
        });
        $(this).parent().remove();
        counter();
    }

    function editItem(){
        var textItem = $(this).siblings('span');
        $('#copyLi').val(textItem.text());
        $('#edit').css('display', 'block');
        $('#save').on('click', function () {
            textItem.text($('#copyLi').val());
            $('#edit').css('display', 'none');
        });
        $('#cancel').on('click', function (){
            $('#edit').css('display', 'none');
        });
    }

    function counter() {
        var notDoneItem = $('li').length;
        var doneItem = $('.checked').length;
        $('#counterOfNotDone').text(notDoneItem - doneItem);
        $('#counter').text(doneItem);
    }
    counter();
    todoList.sortable();
    todoList.on('sortstop');
});