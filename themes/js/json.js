
$(document).ready(function () {

      $('.nav-tabs a').tabs();

    $(document).on("click", "  a ", function () {
        if ($('#main-panel').hasClass('open')) {
            $('#main-panel').filter(':not(:animated)').animate({left: '0'}, function () {
                $(".jqm-navmenu-panel").hide();
                $('#main-panel').removeClass('open');
            });
        }
    });

    $(document).on("click", ".jqm-navmenu-link, #mainmenu a ", function () {
        if ($('#main-panel').hasClass('open')) {
            $('#main-panel').filter(':not(:animated)').animate({left: '0'}, function () {
                $(".jqm-navmenu-panel").hide();
                $('#main-panel').removeClass('open');
            });
        } else {

            $('#main-panel').filter(':not(:animated)').animate({left: '120px'}, function () {
                $('#main-panel').addClass('open');
            });
            $(".jqm-navmenu-panel").show();

        }
    });


    $(".login-register .setup").on("click", function (e) {
        e.preventDefault();
        $(".notification").html();
        var url = $("#shopurl").val();
        var password = $("#password").val();
        var username = $("#username").val();
        if ((url == "") || (username == "") || (password == ""))
        {
            $(".notification").html(" All the fields are required.");
            alert("All the fields are required.");
        }
        else {

            $.ajax({
                url: remote_url + '&call_function=log_user_inn&username=' + username + '&password=' + password,
                dataType: 'json',
                beforeSend: function () {
                    $('.login-register').append(loading_overlay);
                },
                complete: function () {
                 //   $('.login-register .overlay').remove();
                },
                success: function (json)
                {
                    var login = json;
                    if (login[0] === "") {
                        $(".notification").html(" Your Credentials are wrong.");
                    }
                    else {
                        for (var i in login) {
                            var role = login[i].roles;
                            if ((role == 'administrator') || (role == 'store-manager')) {

                                $('#s_user_name').val(username);
                                $('#s_user_id').val(login[i].data.ID);
                                $('#s_station_url').val(url);
                                $('#s_role').val(role);

                                $.mobile.changePage("storemanager.html",
                                    {
                                        transition: "slide",
                                        changeHash: true
                                    });

                                $("#deliverymenu").addClass("hidden");
                            }
                            else if ((role == 'basic_rider') || (role == 'store_user'))
                            {
                                $('#s_user_name').val(username);
                                $('#s_user_id').val(login[i].data.ID);
                                $('#s_station_url').val(url);
                                $('#s_role').val(role);
                                $.mobile.changePage("delivery/index.html",
                                    {
                                    transition: "slide",
                                    changeHash: true
                                });
                                $("#mainmenu").addClass("hidden");
                            }
                            else if ((role == 'customer') || (role == 'subscriber')) {
                           //     $(".notification").html(" Your are not allowed to do this. ");
                             //   $(".notification").html(" Your are not allowed to do this. ");

                                alert("Your are not allowed to do this.");
                            }
                            else
                            {
                               // $(".notification").html(" Your are not allowed to do this. ");
                            }
                        }
                    }
                }
            });


        }
    });


// show all the customers
$(document).on("pagebeforeshow", "#dashboard", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats',
        dataType: 'json',
        beforeSend: function () {
            $('#dashboard ').append(loading_overlay);
        },
        complete: function () {
            $('#dashboard   .overlay').remove();
        },

        success: function (json) {
            var dashboard = json;
            $("#dashboard").find(".dashboard-content").html(fillDashboard(json));
        }
    });
});
// show all the customers
$(document).on("pagebeforeshow", "#yesterday", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats&stats_from=' + getYesterdaysDate(),
        dataType: 'json',
        beforeSend: function () {
            $('#yesterday  ').append(loading_overlay);
        },
        complete: function () {
            $('#yesterday  .overlay').remove();
        },

        success: function (json) {
            var dashboard = json;
            $("#yesterday").find(".dashboard-content").html(fillDashboard(dashboard));
        }
    });
});

// show all the customers
$(document).on("pagebeforeshow", "#week", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats&stats_from=' + getOneWeekDate(),
        dataType: 'json',
        beforeSend: function () {
            $('#week  ').append(loading_overlay);
        },
        complete: function () {
            $('#week  .overlay').remove();
        },
        success: function (json) {
            var dashboard = json;
            $("#week").find(".dashboard-content").html(fillDashboard(dashboard));
        }
    });
});

// show all the customers
$(document).on("pagebeforeshow", "#month", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats&stats_from=' + getOneMonthDate(),
        dataType: 'json',
        beforeSend: function () {
            $('#month  ').append(loading_overlay);
        },
        complete: function () {
            $('#month   .overlay').remove();
        },

        success: function (json) {
            var dashboard = json;
            $("#month").find(".dashboard-content").html(fillDashboard(dashboard));
        }
    });
});

// show all the customers
$(document).on("pagebeforeshow", "#year", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats&stats_from=' + getOneYearDate(),
        dataType: 'json',
        beforeSend: function () {
            $('#year  ').append(loading_overlay);
        },
        complete: function () {
            $('#year   .overlay').remove();
        },

        success: function (json) {
            var dashboard = json;
            $("#year").find(".dashboard-content").html(fillDashboard(dashboard));
        }
    });
});

// show all the customers
$(document).on("pagebeforeshow", "#custom", function () {
    $("#custom-period-select").val("1");
});

$(document).on("change", "#custom-period-select", function () {
    $.ajax({
        url: remote_url + '&call_function=get_store_stats&get_custom_period=1&custom_period=' + $("#custom-period-select").val(),
        dataType: 'json',
        beforeSend: function () {
            $('#custom  ').append(loading_overlay);
        },
        complete: function () {
            $('#custom  .overlay').remove();
        },

        success: function (json) {
            var dashboard = json;
            $("#custom").find(".dashboard-content").html(fillDashboard(dashboard));
        }
    });
});

// show all the customers
$(document).on("pagebeforeshow", "#customers", function () {
    $.ajax({
        url: remote_url + '&call_function=get_customers&get_statuses=1&show=1000&page=1',
        dataType: 'json',
        beforeSend: function () {
            $('#customers  ').append(loading_overlay);
        },
        complete: function () {
            $('#customers  .overlay').remove();
        },
        success: function (json) {
            loop = "<table class='table table-striped table-condensed'><tbody>";
            var customers = json.customers;
            for (var i in customers) {

                loop += '<tr>  <td> <a class="id" data-transition="flip" data-id="' + customers[i].id_customer + '" href="customers-inner.html?id=' + customers[i].id_customer + '" > ' +
                    '<div class="col-sm-8 col-xs-8">' +
                    '<span class="customername clearfix"> Name :' + customers[i].display_name + '</span>' +
                    '<span class="order-number clearfix"> Customer ID: #' + customers[i].id_customer + '</span>' +
                    '<span class="order-status clearfix">  Email Address ' + customers[i].email + '</span>' +
                    '</div>' +
                    '<div class="col-sm-4 col-xs-4">' +
                    '<span class="order-amount clearfix"> ORDERS : ' + customers[i].total_orders + '</span>' +
                    '<span class="order-products clearfix ">  Reg. Date: ' + customers[i].date_add + '</span>' +
                    '<span class="order-nav-icon   clearfix"> <i class="fa fa-chevron-circle-right"></i> </span>' +
                    '</div>' +
                    '  </a> </td> </tr>';
            }
            loop += '</tbody></table>';
            $('#customers .list-content').html(loop);
        }
    });

});

// show all the customers
$(document).on("pagebeforeshow", "#customers-inner", function () {
    $.ajax({
        url: remote_url + '&call_function=get_customers_info&user_id=' + $.urlParam('id') + '&show=1000&page=1', //&call_function=get_customers_info&user_id=,
        dataType: 'json',
        beforeSend: function () {
            $('#customers-inner ').append(loading_overlay);
            $('#customers-inner .tabs').addClass("hidden");
        },
        complete: function () {
            $('#customers-inner .overlay').remove();
            $('#customers-inner .tabs').removeClass("hidden");
        },
        success: function (json) {
            var customer = json;

            var user_info = customer.user_info;
            var billing_info = user_info.billing_info;
            var general_info = customer.user_info.general_info;
            var shipping_info = user_info.shipping_info;
            var customer_orders = customer.customer_orders;
            var c_orders_count = customer.c_orders_count;
            var sum_ords = customer.c_orders_count;

            var name ="<table class='table table-orders table-striped table-condensed'> <tbody><tr> <th colspan='2'>  CUSTOMER DETAILS   </th> </tr>" +
                    "<tr> <td> <span class=''> <strong>  CUSTOMER NAME : </strong></span></span></td> <td> <span>" + user_info.name + "</span> </td></tr>";
            name += "<tr> <td> <span class=''> <strong>  DISPLAY NAME:   </strong></span></span></td> <td> <span>  " + general_info.display_name + "</span></td></tr>";
            name += "<tr> <td> <span class=' '> <strong> EMAIL ADDRESS : </strong></span></span></td> <td> <span>  " + general_info.email + "</span> </td></tr>";
            name += "<tr> <td> <span class=''> <strong>  CUSTOMER ID #:  </strong></span></span></td> <td> <span> " + user_info.customer_id + "</span> </td></tr>";
            name += "<tr> <td> <span class=''> <strong>  ORDERS :        </strong></span></span></td> <td> <span>  #" + customer.c_orders_count + "</span> </td></tr>";
            name += "<tr> <td> <span class=''> <strong>  SUM  :          </strong></span></span></td> <td> <span> " + customer.sum_ords + " /=</span> </td></tr>";
            name += "<tr> <td> <span class=' '> <strong> DATE CREATED :  </strong></span></span></td> <td> <span> " + general_info.date_add + "</span></td></tr>" +
                "</tbody></table>";

          //  name += "<tr> <td><span class='name'> <strong> ORDER NUMBER :</strong>  </span></span></td> <td> <span>  <span> #" + order_info.id_order + "</span> </td></tr>";

            $('#customers-inner #customer-details').html(name);

            var billingaddress = "<table class='table table-orders table-striped table-condensed'> <tbody><tr> <th colspan='2'>  Billing Address    </th> </tr>";;
            billingaddress +="<tr> <td><span class='name'> Name  :  </span></td> <td> <span>  " + billing_info.b_firstname + '  ' + billing_info.b_lastname + "</span></td></tr>";
            billingaddress +="<tr> <td><span class='name'> Email   :  </span> </td> <td> <span> " + billing_info.b_email + "</span> </td></tr>";
            billingaddress +="<tr> <td><span class='name'> Phone  :  </span> </td> <td> <span> " + billing_info.b_phone + "</span> </td></tr>";
            billingaddress +="<tr> <td><span class='name'> Address :  </span> </td> <td> <span> " + billing_info.b_address_1 + "</span> </td></tr>";
            billingaddress +="<tr> <td><span class='name'>           </span></td> <td> <span> " + billing_info.b_address_2 + "</span> </td></tr>";
            billingaddress +="<tr> <td><span class='name'>  City:  </span>  </td> <td><span> " + billing_info.b_city + "</span> </td></tr>";
            billingaddress +="<tr> <td><span class='name'>  Country:   </span> </td> <td> <span> " + billing_info.b_country + "</span> </td></tr>" +
                "</tbody></table>";
            $('#customers-inner #billing').html(billingaddress);

            var shippingaddress = "<table class='table table-orders table-striped table-condensed'> <tbody><tr> <th colspan='2'>  Delivery Address   </th> </tr>";
            shippingaddress +="<tr> <td><span class='name'> Name : </span> </td> <td>  <span> " + shipping_info.s_firstname + '  ' + shipping_info.s_lastname + "    </span> </td></tr>";
            shippingaddress +="<tr> <td><span class='name'> Address :  </span> </td> <td>  <span> " + shipping_info.s_address_1 + " </span>  </td></tr>";
            shippingaddress +="<tr> <td><span class='name'>     </span></td> <td>  <span> " + shipping_info.s_address_2 + "</span>  </td></tr>";
            shippingaddress +="<tr> <td><span class='name'>  Post Code:   </span> </td> <td>  <span> " + shipping_info.s_postcode + "</span> </td></tr>";
            shippingaddress +="<tr> <td><span class='name'>  City :  </span> </td> <td>  <span> " + shipping_info.s_city + "</span>  </td></tr>";
            shippingaddress +="<tr> <td><span class='name'>  Country :  </span> </td> <td>  <span> " + shipping_info.s_country + "</span>   </td></tr>" +
                "</tbody></table>";
            $('#customers-inner #shipping').html(shippingaddress);




            loop_orders = "<table class='table table-striped table-condensed'><tbody> <tr> <th>CUSTOMER ORDERS  </th></tr>";
            var orders = customer_orders;
            for (var i in orders) {
                loop_orders += '<tr>  <td> <a class="id" data-transition="flip" data-id="' + orders[i].id_order + '" href="orders-inner.html?id=' + orders[i].id_order + '" > ' +
                    '<div class="col-sm-8 col-xs-8">' +
                    '<span class="order-number clearfix"> Order Id: #' + orders[i].id_order + '</span>' +
                    '<span class="order-status clearfix ' + orders[i].order_status_id + ' "> ' + orders[i].ord_status + '</span>' +
                    '<span class="order-date clearfix"> ' + orders[i].date_add + '</span>' +
                    '</div>' +
                    '<div class="col-sm-4 col-xs-4">' +

                    '<span class="order-amount clearfix">' + orders[i].total_paid + '   ' + orders[i].currency_code + '</span>' +
                    '<span class="order-nav-icon   clearfix"> <i class="fa fa-chevron-circle-right"></i> </span>' +
                    '</div>' +
                    '  </a> </td> </tr>';
            }
            loop_orders += '</tbody></table>';
            $("#customers-inner  #orders").html(loop_orders);
        }
    });
});

// show all the orders
$(document).on("pagebeforeshow", "#orders", function () {
    $.ajax({
        url: remote_url + '&call_function=get_orders&get_statuses=1&show=1000&page=1',
        dataType: 'json',
        beforeSend: function () {
            $('#orders .list-content').append(loading_overlay);
        },
        complete: function () {
            $('#orders .list-content .overlay').remove();
        },
        success: function (json) {
            loop = "<table class='table table-striped table-condensed'><tbody>";
            var orders = json.orders;
            for (var i in orders) {

                loop += '<tr>  <td> <a class="id" data-transition="flip" data-id="' + orders[i].id_order + '" href="orders-inner.html?id=' + orders[i].id_order + '" > ' +
                    '<div class="col-sm-8 col-xs-8">' +
                    '<span class="customername clearfix">' + orders[i].customer + '</span>' +
                    '<span class="order-number clearfix"> Order Id: ' + orders[i].id_order + '</span>' +
                    '<span class="order-status clearfix ' + orders[i].status_code + ' "> ' + orders[i].ord_status + '</span>' +
                    '<span class="order-date clearfix"> ' + orders[i].date_add + '</span>' +
                    '</div>' +

                    '<div class="col-sm-4 col-xs-4">' +
                    
                    '<span class="order-amount clearfix">' + orders[i].total_paid + '   ' + orders[i].currency_code + '</span>' +
                    '<span class="order-products clearfix "> Products: ' + orders[i].count_prods + '</span>' +
                    '<span class="order-nav-icon   clearfix"> <i class="fa fa-chevron-circle-right"></i> </span>' +
                    '</div>' +
                    '  </a> </td> </tr>';
            }
            loop += '</tbody></table>';
            $('#orders .list-content').html(loop);
        }
    });
});

// show all the orders
$(document).on("pagebeforeshow", "#orders-inner", function () {
    $.ajax({
        url: remote_url + '&call_function=get_orders_info&order_id=' + $.urlParam('id'),
        dataType: 'json',
        beforeSend: function () {
            $('#orders-inner').append(loading_overlay);
            $('#orders-inner .tabs').addClass("hidden");
        },
        complete: function () {
            $('#orders-inner .tabs').removeClass("hidden");
            $('#orders-inner .overlay ').remove();

        },
        success: function (json) {
            var order_info = json.order_info;
            var order_products_count = json.o_products_count;
            var order_comments = json.order_info.admin_comments;
            var order_products = json.order_products;
            var assigned_delivery = json.order_info.assigned_delivery;

            var name = "<table class='table table-striped table-condensed'><tbody>";
            name += "<tr> <td>  <span class='name'> <strong> NAME :</strong> </span></td> <td> <span> " + order_info.customer + "</span></td></tr>";
            name += "<tr> <td><span class='name" + order_info.status_code + "'> <strong> ORDER STATUS :</strong> </span></td> <td> <span> " + order_info.status + "</span></td></tr>";
            name += "<tr> <td><span class='name'> <strong> ORDER NUMBER :</strong>  </span></td> <td> <span> #" + order_info.id_order + "</span> </td></tr>";
            name += "<tr> <td><span class='name'> <strong> DELIVERY METHOD :</strong> </span></td> <td> <span> " + order_info.s_method + "</span> </td></tr>";
            name += "<tr> <td><span class='name'> <strong> PAYMENT  METHOD :</strong> </span></td> <td> <span> " + order_info.p_method + "</span> </td></tr>";
            name += "<tr> <td><span class='name'> <strong> PRODUCTS  :</strong> </span></td> <td> <span> " + order_products_count + "</span> </td></tr>";
            name += "<tr> <td><span class='name'> <strong> AMOUNT  :</strong> </span></td> <td> <span> " + order_info.total + ' ' + order_info.currency_code + "</span> </td></tr>";
            if (assigned_delivery != '')
            {
                name += "<tr> <td><span class='name " + order_info.status_code + "'>  <strong>ASSIGNED TO : </strong> </span></td> <td><span class='label label-success'>  <span> " + assigned_delivery.data.display_name + "</span> </span> </td></tr>";
            }
            else
            {
                if (order_info.status_code == 'wc-delv-await')
                {
                    name += "<tr> <td><a  class='  btn btn-sm bg-red' data-transition='slide'    href='orders-inner-assign.html?id=" + order_info.id_order + "'  > Assign Order  </a>  </td> </tr>"
                }
                //('publish','wc-pending','wc-processing','wc-on-hold','wc-completed','wc-cancelled','wc-refunded','wc-failed')
                else  if
                ((order_info.status_code == 'wc-colc-await')
                    ||(order_info.status_code == 'wc-on-hold')
                    ||(order_info.status_code == 'wc-processing')
                    ||(order_info.status_code == 'wc-pending')
                )
                {
                    name += "<tr><tr> <th class='heading-form' colspan='2'> UPDATE ORDER STATUS </th> </tr> <td colspan='2'> " +
                        "<div class='form-group'><label> Comment: </label><textarea data-role='none' class='form-control' id='reason'></textarea></div>" +
                        "<div class='form-group'><label> New Status: </label> <select class='form-control' id='order_status'> <option value=''> --select-- </option> ";
                  var order_statuses=json.statuses;
                    for (var i in order_statuses)
                    {
                        name += '<option value="' + order_statuses[i].st_id + '"> ' + order_statuses[i].st_name + '</option>';
                    }
                    name +="</select> </div>" +
                            "<div class='form-group'> <input type='checkbox' id='notify_customer' checked='true' value='1' data-role='none' class='checkbox-inline'> <span> Notify the Customer of the Update </span> </div>  "+
                            "<div class='form-group'><a id='order-status-btn'  class='  btn btn-sm bg-red' data-transition='slide'> Update  </a> </div> </td> </tr>"

                }
            }
            name+="</tbody></table>";

            $('#orders-inner #customer-details').html(name);

            var orders = "<table class='table table-striped table-orders table-condensed'> <tbody><tr> <th colspan='2'>  General   </th> </tr>";
            orders +=  "<tr> <td> <span class='name'> NAME   :  </span>  </td> <td> <span> " + order_info.customer + "</span>  </td></tr>";
            orders += "<tr> <td> <span class='name'> EMAIL  :  </span> </td> <td><span> " + order_info.email + "</span>  </td></tr>";
            orders +=  "<tr> <td> <span class='name'> STATUS :  </span> </td> <td><span> " + order_info.status + "</span>  </td></tr>";
            orders +=  "<tr> <td> <span class='name'> CREATED:  </span> </td> <td><span> " + order_info.date_added + "</span>  </td></tr>";
            orders +=  "<tr> <td> <span class='name'> TOTAL  :  </span> </td> <td> <span> " + order_info.total + ' ' + order_info.currency_code + "</span>  </td></tr>";
            orders+="</tbody></table>";
            $('#orders-inner #info').html(orders);

            var shipping = "<table class='table table-orders table-condensed'> <tbody><tr> <th colspan='2'>  Discounts, Shipping, Coupons   </th> </tr>";
            //row_start + "<div class='col-sm-12 col-xs-12'>    </div>" + row_end;
            shipping +=  "<tr> <td> <span class='name'> Shipping   : </span> </td> <td><span> " + order_info.total_shipping + "</span> </td></tr>";
            shipping +=  "<tr> <td>  <span class='name'> Discount  :  </span> </td> <td><span> " + order_info.discount + "</span> </td></tr>";
            shipping +=  "<tr> <td>  <span class='name'> Tax  :  </span> </td> <td><span> " + order_info.tax_amount + "</span></td></tr>";
            shipping +=  "<tr> <td> <span class='name'> Tax Refunded:  </span> </td> <td><span> " + order_info.t_refunded + "</span> </td></tr>";
            shipping += "<tr> <td>  <span class='name'> Total  :  </span> </td> <td><span> " + order_info.currency_code + ' ' + order_info.order_total + "</span></td></tr>";

            shipping+="</tbody></table>";
            $('#orders-inner #order').html(shipping);

            var shippingaddress =  "<table class='table table-orders table-condensed'> <tbody><tr> <th colspan='2'> Delivery Address   </th> </tr>";
            shippingaddress +=  "<tr> <td>  <span class='name'> Delivery Method  : </span> </td> <td><span> " + order_info.s_method + "    </span>   </td></tr>";
            shippingaddress +=  "<tr> <td> <span class='name'> Name  :  </span> </td> <td><span> " + order_info.s_name + "      </span>   </td></tr>";
            shippingaddress +=  "<tr> <td> <span class='name'> Address :  </span></td> <td><span> " + order_info.s_address_1 + " </span>  <br/> <span> " + order_info.s_address_2 + "</span>  </td></tr>";
            shippingaddress +=  "<tr> <td> <span class='name'>  Post Code   </span> </td> <td><span> " + order_info.s_postcode + "</span>  </td></tr>";
            shippingaddress +=  "<tr> <td> <span class='name'>  Country   </span> </td> <td><span> " + order_info.s_country + "</span>   </td></tr>";
            shippingaddress+="</tbody></table>";
            $('#orders-inner #shipping').html(shippingaddress);

            var billingaddress =  "<table class='table table-orders table-condensed'> <tbody><tr> <th colspan='2'>  Billing  Address   </th> </tr>";
            billingaddress += "<tr> <td><span class='name'> Payment  Method  : </span> </td> <td><span> " + order_info.p_method + "</span>  </td></tr>";
            billingaddress += "<tr> <td><span class='name'> Name  :  </span> </td> <td><span> " + order_info.b_name + "</span> </td></tr>";
            billingaddress += "<tr> <td><span class='name'> Email   :  </span> </td> <td><span> " + order_info.b_email + "</span>  </td></tr>";
            billingaddress += "<tr> <td><span class='name'> Phone  :  </span> </td> <td><span> " + order_info.b_telephone + "</span>  </td></tr>";
            billingaddress += "<tr> <td><span class='name'> Address :  </span> </td> <td><span> " + order_info.b_address_1 + "</span> <br/> <span> " + order_info.b_address_2 + "</span>  </td></tr>";
            billingaddress += "<tr> <td><span class='name'>  City  </span> </td> <td><span> " + order_info.b_city + "</span>  </td></tr>";
            billingaddress += "<tr> <td><span class='name'>  Country   </span> </td> <td><span> " + order_info.b_country + "</span>  </td></tr>";
            billingaddress+="</tbody></table>";
            $('#orders-inner #billing').html(billingaddress);

           var order_history =  "<table class='table table-orders table-condensed'> <tbody><tr> <th colspan='2'>  ORDER HISTORY  </th> </tr>";
           for (var i in order_comments) {
               order_history += "<tr> <td>";
                order_history += row_start + "<div class='col-sm-3 col-xs-3'> <span class='name'> Date  : </span> </div> <div class='col-sm-9 col-xs-9'><p> " + order_comments[i].date_added + "</p> </div>" + row_end;
                order_history += row_start + "<div class='col-sm-3 col-xs-3'> <span class='name'> " + order_comments[i].note_type + "   :  </span> </div> <div class='col-sm-9 col-xs-9'><p> " + order_comments[i].note + "</p> </div>" + row_end;
               order_history += "</td> </tr>";
            }
            order_history+="</tbody></table>";
            $('#orders-inner #history').html(order_history);


           var products =  "<table class='table table-orders table-condensed'> <tbody><tr> <th >  ORDERED PRODUCTS  </th> </tr>";
            for (var i in order_products) {
                products += '<tr>  <td> ' +
                    "<div class='col-sm-3 col-xs-3'>" +
                    '<a class="id" data-transition="flip" data-id="' + order_products[i].product_id + '" href="products-inner.html?id=' + order_products[i].product_id + '" > ' +
                    "<img class='img-responsive' src='" + order_products[i].thumbnail + "'  /> " + "  </a>"+
                    "</div>" +
                    "<div class='col-sm-9 col-xs-9'> " +
                    '<a class="id" data-transition="flip" data-id="' + order_products[i].product_id + '" href="products-inner.html?id=' + order_products[i].product_id + '" > ' +
                    "<span class='title'> NAME : " + order_products[i].product_name + "  </span> <div class='clearfix'> </div> " +
                    "<span class='title'> Type : " + order_products[i].product_type + "  </span> <div class='clearfix'> </div>" +
                    "<span class='title'> Quantity : " + order_products[i].product_quantity + "  </span> <div class='clearfix'> </div>  " +
                    "<span class='title'>Price : " + order_products[i].product_price + " </span> <div class='clearfix'> </div>" +
                    '   </a> ' +
                    '</div> </td> </tr>';
            }
            products+="</tbody></table>";
            $('#orders-inner #products').html(products);


        }
    });

});

// show all the orders
$(document).on("pagebeforeshow", "#orders-inner-assign", function () {
    $.ajax({
        url: remote_url + '&call_function=get_users',
        dataType: 'json',
        beforeSend: function ()
        {
            $('#orders-inner-assign  ').append(loading_overlay);
        },
        complete: function ()
        {
            $('#orders-inner-assign   .overlay').remove();
        },
        success: function (json)
        {
            loop = "";
            var users = json;
            for (var i in users)
            {
                loop += '<option value="' + users[i].ID + '"> ' + users[i].data.user_login + '</option>';
            }
          //  console.log(loop);
            $('#orders-inner-assign #deliveryusers').append(loop);
        }
    });

});

$(document).on("click", "#orders-inner-assign input[type=checkbox]", function () {
    $(this).val(this.checked ? 1 : 0);
});

$(document).on("click", "#order-assign-btn", function () {
    var assigned_delivery = $('#orders-inner-assign #deliveryusers').val();
    var message = $('#orders-inner-assign #reason').val();
    var notify_customer = $('#orders-inner-assign #notify_customer').val();
    var notify_rider = $('#orders-inner-assign #notify_rider').val();
    var order_id = $.urlParam('id');

    $.ajax({
        url: remote_url + '&call_function=set_delivery&message=' + message + '&assigned_delivery=' + assigned_delivery + '&notify_customer=' + notify_customer + '&notify_rider=' + notify_rider + '&order_id=' + order_id+'&action=change_status',
        dataType: 'json',
        beforeSend: function () {
            $('#orders-inner-assign  ').append(loading_overlay);
        },
        complete: function () {
            $('#orders-inner-assign   .overlay').remove();
        },
        success: function (json) {
            $.mobile.changePage("orders-inner.html?id="+order_id,
                {
                    transition: "slide",
                    changeHash: true
                });
        }

    });
});


// show all the orders
    $(document).on("pagebeforeshow", "#delivery-orders", function () {
        $.ajax({
            url: remote_url + '&call_function=get_orders&get_statuses=1&show=1000&page=1&delivery_person='+$("#s_user_id").val(),
            dataType: 'json',
            beforeSend: function () {
                $('#delivery-orders .list-content').append(loading_overlay);
            },
            complete: function () {
                $('#delivery-orders .list-content .overlay').remove();
            },
            success: function (json) {
                loop = "<table class='table table-striped table-condensed'><tbody>";
                var orders = json.orders;
                for (var i in orders) {

                    loop += '<tr>  <td> <a class="id" data-transition="flip" data-id="' + orders[i].id_order + '" href="orders-inner.html?id=' + orders[i].id_order + '" > ' +
                        '<div class="col-sm-8 col-xs-8">' +
                        '<span class="customername clearfix">' + orders[i].customer + '</span>' +
                        '<span class="order-number clearfix"> Order Id: ' + orders[i].id_order + '</span>' +
                        '<span class="order-status clearfix ' + orders[i].status_code + ' "> ' + orders[i].ord_status + '</span>' +
                        '<span class="order-date clearfix"> ' + orders[i].date_add + '</span>' +
                        '</div>' +

                        '<div class="col-sm-4 col-xs-4">' +

                        '<span class="order-amount clearfix">' + orders[i].total_paid + '   ' + orders[i].currency_code + '</span>' +
                        '<span class="order-products clearfix "> Products: ' + orders[i].count_prods + '</span>' +
                        '<span class="order-nav-icon   clearfix"> <i class="fa fa-chevron-circle-right"></i> </span>' +
                        '</div>' +
                        '  </a> </td> </tr>';
                }
                loop += '</tbody></table>';
                $('#delivery-orders .list-content').html(loop);
            }
        });
    });


$(document).on("click", "#order-status-btn", function () {
         var message = $('#orders-inner #reason').val();
         var notify_customer = $('#orders-inner #notify_customer').val();
         var order_status = $('#orders-inner #order_status').val();

         var order_id = $.urlParam('id');

        $.ajax({
            url: remote_url + '&call_function=set_order_action&change_order_status_comment=' + message + '&notify_customer=' + notify_customer + '&order_id=' + order_id+'&new_status=' + order_status +'&action=change_status',
            dataType: 'json',
            beforeSend: function () {
                $('#orders-inner').append(loading_overlay);
            },
            complete: function () {
                $('#orders-inner   .overlay').remove();
            },
            success: function (json) {
                $.mobile.changePage("orders-inner.html?id="+order_id,
                    {
                        allowSamePageTransition: true,
                        reloadPage: true,
                        transition: "fade",

                    });
            }

        });
    });


// show all the customers
$(document).on("pagebeforeshow", "#products", function () {
    $.ajax({
        url: remote_url + '&call_function=search_products&show=1000&page=1',
        dataType: 'json',
        beforeSend: function () {
            $('#products .list-content').append(loading_overlay);
        },
        complete: function () {
            $('#products .list-content .overlay').remove();
        },
        success: function (json) {
            loop = "<table class='table table-condensed table-striped'><tbody>";
            var products = json.products;
            for (var i in products) {


                loop += '<tr>  <td> ' +
                      "<div class='col-sm-3 col-xs-3'>" +
                    '<a class="id" data-transition="flip" data-id="' + products[i].product_id + '" href="products-inner.html?id=' + products[i].product_id + '" > ' +
                    "<img class='img-responsive' src='" + products[i].thumbnail + "'  /> " + "  </a>"+
                    "</div>" +

                    "<div class='col-sm-9 col-xs-9'> " +
                    '<a class="id" data-transition="flip" data-id="' + products[i].product_id + '" href="products-inner.html?id=' + products[i].product_id + '" > ' +
                    "<span class='title'> NAME : " + products[i].name + "  </span> <div class='clearfix'> </div> " +
                    "<span class='title'> Type : " + products[i].product_type + "  </span> <div class='clearfix'> </div>" +
                    "<span class='title'> Quantity : " + products[i].quantity + "  </span> <div class='clearfix'> </div>  " +
                    "<span class='title'>Price : " + products[i].price + " </span> <div class='clearfix'> </div>" +
                    '   </a> ' +
                    '</div> </td> </tr>';
            }
            loop += '</tbody></table>';
            $('#products .list-content').html(loop);
        }
    });

});

// show all the customers
$(document).on("pagebeforeshow", "#products-inner", function () {
    $.ajax({
        url: remote_url + '&call_function=get_products_info&product_id=' + $.urlParam('id'),
        dataType: 'json',
        beforeSend: function () {
            $('#products-inner ').append(loading_overlay);
        },
        complete: function () {
           $('#products-inner .overlay').remove();
        },
        success: function (json) {
            var product_content = "<table class='table   table-responsive table-list'><tbody>";
            var product = json;
             product_content +=  "<tr> <th colspan='2'>  <h3> " + product.name + " </h3>  </th></tr>" ;
            product_content +=   "<tr> <th colspan='2'> " +   " <img class='img-responsive' src='" + product.id_image + "'  />    </th></tr>";
            product_content +=   "<tr> <td>  <span class='name'> Price  :  </span> </td> <td> <span> " + product.price + "      </span>    " + "</td> </tr>";
            product_content +=   "<tr> <td>  <span class='name'> Quantity :  </span> </td> <td> <span> " + product.quantity + " </span>    " + "</td> </tr>";
            product_content +=   "<tr> <td>  <span class='name'> Type   : </span> </td> <td> <span> " + product.product_type + "</span>    " + "</td> </tr>";
            product_content +=   "<tr> <td>  <span class='name'> Status : </span> </td> <td> <span> " + product.post_status + "</span>   " + "</td> </tr>";
            product_content +=   "<tr> <td>  <span class='name'> Total Ordered :  </span> </td> <td> <span> " + product.total_ordered + "</span>  " + "</td> </tr>";
            product_content += "</tbody></table>"  ;
            $('#products-inner .list-content').html(product_content);

            $.ajax({
                url: remote_url + '&call_function=get_products_descr&product_id=' + $.urlParam('id'),
                dataType: 'json',
                success: function (json) {
                    var product = json;
                    var product_desc = row_start + "<div class='col-sm-12 col-xs-12'> " + product.descr + " </div>" + row_end;
                    var product_shortdesc = row_start + "<div class='col-sm-12 col-xs-12'> " + product.short_descr + " </div>" + row_end;
                    //  $('#products-inner #shortdesc').html(product_shortdesc);
                    $('#products-inner #longdesc').html(product_desc);
                }
            });
        }
    });

});

$.widget("ui.tabs", $.ui.tabs, {
        _createWidget: function (options, element) {
            var page, delayedCreate,
                that = this;
            if ($.mobile.page) {
                page = $(element)
                    .parents(":jqmData(role='page'),:mobile-page")
                    .first();
                if (page.length > 0 && !page.hasClass("ui-page-active")) {
                    delayedCreate = this._super;
                    page.one("pagebeforeshow", function () {
                        delayedCreate.call(that, options, element);
                    });
                }
            } else {
                return this._super();
            }
        }
    });

});


$(document).on("pageshow", function() { // login

    $('.logout').off('click').on("click",function(e) {
        var firstrun = window.localStorage.getItem("runned");
        firstrun = null;

    });
});