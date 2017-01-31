$(document).ready(function () {
    let todoList = $('#todo-list');

    $(document).on('click', '.del-item', deleteItem);
    $(document).on('click', '.text-todo', selectItem);
    $(document).on('click', '.edit-item', editItem);

    $('#add-press').on('click', function () {
        let addItem = $('#todo-enter').val();
        if(addItem !== '') {
            todoList.append('<li class="box">' + '<span class="text-todo">' + addItem + '</span>'
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
            for(let i = 0; i < data.length; i++){
                todoList.append('<li class="box">' + '<span class="text-todo">'  + data[i].item + '</span>'
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

    function editItem() {
        let textItem = $(this).siblings('span');
        $('#copyLi').val(textItem.text());
        $('#edit').css('display', 'block');
        $('#save').on('click', function () {
            $.ajax({
                type: 'PUT',
                contentType: 'application/json',
                url: 'api/v1/todo/' + textItem.text(),
                data: JSON.stringify({ "todo": {"item": $('#copyLi').val()}}),
                success: function () {
                    textItem.text($('#copyLi').val());
                    console.log("success PUT");
                }
            });
            $('#edit').css('display', 'none');
        });
        $('#cancel').on('click', function () {
            $('#edit').css('display', 'none');
        });
    }

    function counter() {
        let notDoneItem = $('li').length;
        let doneItem = $('.checked').length;
        $('#counterOfNotDone').text(notDoneItem - doneItem);
        $('#counter').text(doneItem);
    }
    counter();
    todoList.sortable();
    todoList.on('sortstop');
});