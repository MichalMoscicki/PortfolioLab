<%--
  Created by IntelliJ IDEA.
  User: michalmoscicki
  Date: 16/05/2023
  Time: 20:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<jsp:include page="header.jsp"/>
</header>

<section class="login-page">
    <h2>Załóż konto</h2>
    <form:form action="/register" method="post" modelAttribute="user">
        <div class="form-group">
            <form:input path="firstName" placeholder="Imię"/>
        </div>
        <div class="form-group">
            <form:input path="lastName" placeholder="Nazwisko"/>
        </div>
        <div class="form-group">
            <form:input path="email" placeholder="Email"/>
        </div>
        <div class="form-group">
            <form:input path="password" placeholder="Hasło"/>
        </div>
        <div class="form-group">
            <input type="password" name="password2" placeholder="Powtórz hasło" />
        </div>

        <div class="form-group form-group--buttons">
            <button class="btn" type="submit">Załóż konto</button>
            <a href="login.html" class="btn btn--without-border">Zaloguj się</a>
        </div>
    </form:form>
</section>
<jsp:include page="footer.jsp"/>