from django.shortcuts import render,redirect
from django.utils import timezone
from .models import Article
from .forms import ArticleForm
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required

# Create your views here.
def article_list(request):
	articles = Article.objects.all().order_by('-created_date')
	return render(request, 'np/article_list.html', {'articles': articles})
	
def article_detail(request, pk):
	article = get_object_or_404(Article, pk=pk)
	return render(request, 'np/article_detail.html', {'article': article})
	
def article_section(request, pk):
	articles = Article.objects.filter(section=pk).order_by('-created_date')
	return render(request, 'np/article_list.html', {'articles': articles})
	
@login_required	
def article_new(request):
    form = ArticleForm()
    return render(request, 'np/article_edit.html', {'form': form})

@login_required	
def article_new(request):
    if request.method == "POST":
        form = ArticleForm(request.POST)
        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.created_date = timezone.now()
            article.save()
            return redirect('article_detail', pk=article.pk)
    else:
        form = ArticleForm()
    return render(request, 'np/article_edit.html', {'form': form})
	
@login_required
def article_edit(request, pk):
    article = get_object_or_404(Article, pk=pk)
    if request.method == "POST":
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            article = form.save(commit=False)
            article.author = request.user
            article.created_date = timezone.now()
            article.save()
            return redirect('article_detail', pk=article.pk)
    else:
        form = ArticleForm(instance=article)
    return render(request, 'np/article_edit.html', {'form': form})
	
@login_required
def article_remove(request, pk):
    article = get_object_or_404(Article, pk=pk)
    article.delete()
    return redirect('article_list')
